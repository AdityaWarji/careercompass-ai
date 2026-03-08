import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Suggestion = {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

type AnalysisResult = {
  score: number;
  headline_score: number;
  summary_score: number;
  experience_score: number;
  skills_score: number;
  network_score: number;
  skills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: Suggestion[];
  headline_suggestion: string;
  summary_suggestion: string;
  industry: string;
  seniority: "entry" | "mid" | "senior" | "executive";
  completeness: number;
  profile_name: string;
};

const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

const toJson = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), { status, headers: jsonHeaders });

const clampScore = (value: unknown) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
};

const sanitizeTextArray = (value: unknown, maxItems = 10) =>
  Array.isArray(value)
    ? value
        .map((item) => String(item).trim())
        .filter(Boolean)
        .slice(0, maxItems)
    : [];

const normalizePriority = (value: unknown): "high" | "medium" | "low" => {
  const priority = String(value || "").toLowerCase();
  if (priority === "high" || priority === "medium" || priority === "low") return priority;
  return "medium";
};

const normalizeAnalysis = (raw: any): AnalysisResult => ({
  score: clampScore(raw?.score),
  headline_score: clampScore(raw?.headline_score),
  summary_score: clampScore(raw?.summary_score),
  experience_score: clampScore(raw?.experience_score),
  skills_score: clampScore(raw?.skills_score),
  network_score: clampScore(raw?.network_score),
  skills: sanitizeTextArray(raw?.skills, 20),
  strengths: sanitizeTextArray(raw?.strengths, 8),
  weaknesses: sanitizeTextArray(raw?.weaknesses, 8),
  suggestions: Array.isArray(raw?.suggestions)
    ? raw.suggestions
        .slice(0, 8)
        .map((item: any) => ({
          title: String(item?.title || "Suggestion").slice(0, 100),
          description: String(item?.description || "").slice(0, 600),
          priority: normalizePriority(item?.priority),
        }))
        .filter((item: Suggestion) => item.description.trim().length > 0)
    : [],
  headline_suggestion: String(raw?.headline_suggestion || "").slice(0, 220),
  summary_suggestion: String(raw?.summary_suggestion || "").slice(0, 1200),
  industry: String(raw?.industry || "Unknown"),
  seniority: (["entry", "mid", "senior", "executive"].includes(String(raw?.seniority))
    ? raw.seniority
    : "entry") as AnalysisResult["seniority"],
  completeness: clampScore(raw?.completeness),
  profile_name: String(raw?.profile_name || ""),
});

const parseAiJson = (content: string) => {
  const cleaned = content.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    }
    throw new Error("Failed to parse analysis results");
  }
};

const extractProfileHandle = (profileUrl: string) => {
  const match = profileUrl.match(/linkedin\.com\/in\/([^\/?#]+)/i);
  return match ? match[1].trim() : "";
};

const normalizeUrl = (rawUrl: string) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const timeoutFetch = async (url: string, init: RequestInit, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const collectRealtimeProfileSignals = async (profileUrl: string) => {
  const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY") || "";
  const SERP_API_KEY = Deno.env.get("SERP_API_KEY") || "";

  const normalizedProfileUrl = normalizeUrl(profileUrl);
  const profileHandle = extractProfileHandle(normalizedProfileUrl);
  const displayHandle = profileHandle ? profileHandle.replace(/-/g, " ") : "";
  const searchName = displayHandle || normalizedProfileUrl;

  const gatheredChunks: string[] = [];
  const candidateUrls = new Set<string>();

  if (normalizedProfileUrl) candidateUrls.add(normalizedProfileUrl);

  const firecrawlPromise = FIRECRAWL_API_KEY
    ? timeoutFetch(
        "https://api.firecrawl.dev/v1/search",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `site:linkedin.com/in "${searchName}" (experience OR skills OR summary OR projects)`,
            limit: 8,
            scrapeOptions: { formats: ["markdown"] },
          }),
        },
        13000,
      ).then(async (resp) => ({ ok: resp.ok, status: resp.status, data: await resp.json() }))
    : Promise.resolve({ ok: false, status: 0, data: null });

  const serpPromise = SERP_API_KEY
    ? timeoutFetch(
        `https://serpapi.com/search.json?${new URLSearchParams({
          engine: "google",
          q: `site:linkedin.com/in "${searchName}"`,
          hl: "en",
          num: "10",
          api_key: SERP_API_KEY,
        }).toString()}`,
        { method: "GET" },
        13000,
      ).then(async (resp) => ({ ok: resp.ok, status: resp.status, data: await resp.json() }))
    : Promise.resolve({ ok: false, status: 0, data: null });

  const [firecrawlResult, serpResult] = await Promise.allSettled([firecrawlPromise, serpPromise]);

  if (firecrawlResult.status === "fulfilled" && firecrawlResult.value.ok) {
    const firecrawlData = firecrawlResult.value.data;
    const rows = Array.isArray(firecrawlData?.data) ? firecrawlData.data : [];

    for (const row of rows) {
      const parts: string[] = [];
      if (row?.url) {
        candidateUrls.add(String(row.url));
        parts.push(`Source: ${row.url}`);
      }
      if (row?.title) parts.push(`Title: ${row.title}`);
      if (row?.description) parts.push(`Description: ${row.description}`);
      const markdown = typeof row?.markdown === "string" ? row.markdown.slice(0, 2200) : "";
      if (markdown) parts.push(`Content: ${markdown}`);

      const chunk = parts.join("\n").trim();
      if (chunk) gatheredChunks.push(chunk);
    }
  }

  if (serpResult.status === "fulfilled" && serpResult.value.ok) {
    const serpData = serpResult.value.data;
    const organic = Array.isArray(serpData?.organic_results) ? serpData.organic_results : [];

    for (const item of organic.slice(0, 10)) {
      const link = String(item?.link || "").trim();
      if (!link) continue;
      if (!link.includes("linkedin.com/in/")) continue;

      candidateUrls.add(link);

      const parts: string[] = [];
      if (item?.title) parts.push(`Search Title: ${item.title}`);
      if (item?.snippet) parts.push(`Search Snippet: ${item.snippet}`);
      parts.push(`Search Link: ${link}`);
      const chunk = parts.join("\n").trim();
      if (chunk) gatheredChunks.push(chunk);
    }
  }

  // Try fresh page-level scrape for top candidate URLs (best effort)
  if (FIRECRAWL_API_KEY && candidateUrls.size > 0) {
    const topUrls = [...candidateUrls].filter(Boolean).slice(0, 3);
    const scrapeCalls = topUrls.map(async (url) => {
      try {
        const resp = await timeoutFetch(
          "https://api.firecrawl.dev/v1/scrape",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url,
              formats: ["markdown"],
              onlyMainContent: true,
              waitFor: 1200,
            }),
          },
          15000,
        );

        if (!resp.ok) return "";
        const body = await resp.json();
        const markdown = body?.data?.markdown || body?.markdown || "";
        const title = body?.data?.metadata?.title || body?.metadata?.title || "";
        if (!markdown) return "";

        return [`Fresh Source: ${url}`, title ? `Page Title: ${title}` : "", String(markdown).slice(0, 2600)]
          .filter(Boolean)
          .join("\n");
      } catch {
        return "";
      }
    });

    const scraped = await Promise.all(scrapeCalls);
    for (const chunk of scraped) {
      if (chunk.trim()) gatheredChunks.push(chunk);
    }
  }

  const deduped = [...new Set(gatheredChunks.map((c) => c.trim()).filter(Boolean))];
  const joined = deduped.join("\n\n---\n\n").trim();

  return {
    profileHandle,
    sourceCount: deduped.length,
    text: joined,
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const profileUrl = String(body?.profileUrl || "").trim();
    const profileText = String(body?.profileText || "").trim();

    if (!profileUrl && !profileText) {
      return toJson({ error: "Please provide a LinkedIn profile URL or profile text." }, 400);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const sections: string[] = [];
    let sourceCount = 0;

    if (profileText) {
      sections.push(`User-provided LinkedIn profile content:\n${profileText}`);
    }

    if (profileUrl) {
      const liveSignals = await collectRealtimeProfileSignals(profileUrl);
      sourceCount = liveSignals.sourceCount;

      console.log("Searching for LinkedIn profile:", liveSignals.profileHandle || profileUrl);
      console.log("Realtime source count:", sourceCount);

      if (liveSignals.text) {
        sections.push(
          `LinkedIn Profile URL: ${normalizeUrl(profileUrl)}\nProfile Handle: ${liveSignals.profileHandle || "unknown"}\n\nLive public web signals:\n\n${liveSignals.text}`,
        );
      }
    }

    const contentToAnalyze = sections.join("\n\n===\n\n").trim();

    // If URL-only flow couldn't get enough live data, fall back to manual paste safely
    if (!profileText && sourceCount < 2) {
      return toJson({
        success: false,
        showManualInput: true,
        error:
          "Could not find enough reliable public information for this LinkedIn profile in real time. Please paste your profile content for a more accurate analysis.",
      });
    }

    if (!contentToAnalyze || contentToAnalyze.length < 80) {
      return toJson({
        success: false,
        showManualInput: true,
        error: "Not enough profile content to analyze. Please paste your LinkedIn profile text.",
      });
    }

    const systemPrompt = `You are an expert LinkedIn profile analyst and career coach.

You MUST respond with valid JSON only, no markdown, no explanation outside JSON. Use this exact structure:
{
  "score": <number 0-100>,
  "headline_score": <number 0-100>,
  "summary_score": <number 0-100>,
  "experience_score": <number 0-100>,
  "skills_score": <number 0-100>,
  "network_score": <number 0-100>,
  "skills": ["skill1", "skill2", ...],
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "suggestions": [
    {"title": "short title", "description": "detailed actionable suggestion", "priority": "high|medium|low"}
  ],
  "headline_suggestion": "suggested improved headline",
  "summary_suggestion": "suggested improved summary/about section (2-3 sentences)",
  "industry": "detected industry",
  "seniority": "entry|mid|senior|executive",
  "completeness": <number 0-100>,
  "profile_name": "detected full name from profile"
}

Rules:
- Use the provided live signals and user content as evidence.
- Do not invent achievements not supported by the evidence.
- If information is missing, explicitly reflect that in weaknesses and suggestions.
- Keep suggestions specific and practical.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this LinkedIn profile:\n\n${contentToAnalyze}` },
        ],
        temperature: 0,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return toJson({ error: "Rate limit exceeded. Please try again in a moment." }, 429);
      }
      if (response.status === 402) {
        return toJson({ error: "AI credits exhausted. Please add credits." }, 402);
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI analysis failed");
    }

    const aiData = await response.json();
    const content = aiData?.choices?.[0]?.message?.content || "";
    const parsed = normalizeAnalysis(parseAiJson(String(content)));

    return toJson({
      success: true,
      data: parsed,
      meta: {
        realtime_sources_used: sourceCount,
      },
    });
  } catch (error) {
    console.error("LinkedIn analyzer error:", error);
    return toJson(
      { error: error instanceof Error ? error.message : "Analysis failed" },
      500,
    );
  }
});

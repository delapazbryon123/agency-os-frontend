import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { url: rawUrl } = await req.json();

    if (!rawUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL — handle "apple.com", "www.apple.com", "http://..." etc.
    const url = rawUrl.trim().match(/^https?:\/\//i)
      ? rawUrl.trim()
      : `https://${rawUrl.trim()}`;

    const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!FIRECRAWL_API_KEY || !GEMINI_API_KEY) {
      return NextResponse.json({ error: "Server missing API keys" }, { status: 500 });
    }

    // 1. Scrape Website using Firecrawl
    console.log(`[API] Scraping URL: ${url}`);

    const scrapeResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, formats: ["markdown"] }),
    });

    if (!scrapeResponse.ok) {
      const errText = await scrapeResponse.text();
      console.error("[API] Firecrawl Error:", errText);
      return NextResponse.json({ error: "Failed to scrape the website. Please check the URL." }, { status: 500 });
    }

    const { data } = await scrapeResponse.json();
    const markdownContent = data?.markdown || "";

    if (!markdownContent) {
      return NextResponse.json({ error: "Scraping succeeded, but no content was extracted from this URL." }, { status: 400 });
    }

    // 2. Generate styled HTML SEO Report using Gemini
    console.log(`[API] Extracted ${markdownContent.length} chars. Generating report...`);
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const hostname = new URL(url).hostname;
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const prompt = `
You are a senior SEO strategist and client-facing marketing analyst at a professional digital agency.
Your task is to generate a **complete, fully styled, print-ready HTML SEO report** for the website: ${url}

The report MUST be a single, self-contained HTML file with all CSS embedded in a <style> tag.
DO NOT output Markdown. Output ONLY valid HTML — no code fences, no explanation text before or after the HTML.

---

## DESIGN SYSTEM (embed this CSS exactly)

Use these design tokens throughout:
- Font: Inter (import from Google Fonts)
- Background: #0D0D0D (page), #111111 (card bg)
- Text: #F0F0F0 (main), #A0A0A0 (secondary)
- Accent Yellow: #FACC15
- Border: rgba(255,255,255,0.08)
- Success/Win: #22c55e (green)
- Warning/Alert: #ef4444 (red)
- Opportunity: #3b82f6 (blue)

## CALLOUT BOX TYPES (use these extensively)

Create styled divs for:
1. **Insight Box** (left border yellow, subtle yellow bg): Key findings
2. **Alert Box** (left border red, subtle red bg): Critical issues
3. **Win Box** (left border green, subtle green bg): Positive highlights
4. **Opportunity Box** (left border blue, subtle blue bg): Growth opportunities

## REPORT STRUCTURE

Generate ALL 11 sections. Use real, specific data from the scraped content where possible. 
For data that must be estimated, use industry benchmarks and clearly label them as estimates.

### SECTION 1: Cover Page
- Large client website name: ${hostname}
- "SEO Performance Report"
- Date: ${today}
- "Prepared by: Agency OS — AI-Powered SEO Intelligence"

### SECTION 2: Executive Summary
- 2–3 paragraph summary of the site's current SEO state.
- Key metric snapshot table (estimated based on site complexity/niche):
  | Metric | Estimated Current State | Industry Benchmark |
  Rows: Organic Visibility, Domain Authority Range, Content Depth, Technical Health Score (out of 10), Mobile Optimization

### SECTION 3: Key Highlights
- **Wins (3 items):** What is working well — green Win Boxes
- **Challenges (3 items):** What is actively hurting them — red Alert Boxes

### SECTION 4: Performance Overview (US-Focused)
- Explanation of how they appear to be performing based on site content and structure
- An estimated traffic profile table by device type
- Commentary on their US market positioning

### SECTION 5: Keyword Performance Analysis
- Top 10 keywords they are MOST LIKELY targeting (derived from scraped content)
- For each keyword provide: Keyword | Est. Monthly Search Vol | Est. SEO Difficulty (0-100) | Current Rank Estimate | Opportunity Tier
- Opportunity Tier rules: 0-25 difficulty = "🟢 Easy Win", 26-50 = "🟡 Achievable", 51-70 = "🟠 Competitive", 71-100 = "🔴 Hard"
- Highlight 2-3 keywords in blue Opportunity boxes as "Quick Win" targets

### SECTION 6: Content Performance
- Analyze the scraped content quality (word count estimation, topical coverage)
- List the top 3-5 apparent content pages/sections
- Flag any content gaps or duplicate risk in Alert boxes
- List 3 specific new content ideas as Opportunity boxes

### SECTION 7: Technical SEO Health
- Score each technical element: Title Tags, Meta Descriptions, Heading Structure, Schema/Structured Data, Page Speed Indicators, Mobile Friendliness, Internal Linking, Image Alt Text
- Present as a styled table with ✅ Pass / ⚠️ Needs Work / ❌ Fail status
- If Schema is missing or weak, include the full Schema Fix Guide:
  * WordPress: Use Rank Math or Yoast — Homepage: Organization + Person schema, Service pages: Service + FAQPage schema, Blog: Article + BreadcrumbList, About: Person schema. Validate at: search.google.com/test/rich-results

### SECTION 8: Backlink & Authority Growth
- Estimate current authority tier based on site age and content depth
- Provide the 3-tier backlink roadmap:
  * Tier 1 (This Week): Google Business Profile, Clutch.co, G2, UpCity, LinkedIn profiles
  * Tier 2 (1-3 Months): HARO/Connectively, guest posts, resource page outreach, partner links
  * Tier 3 (3+ Months): Original research/data, speaking events, linkable resource campaigns

### SECTION 9: Opportunities for Growth
- Ranked table with: Priority (1-5 stars) | Opportunity | Impact | Effort | Timeline
- Include at least 6 specific, actionable opportunities derived from the site content

### SECTION 10: Recommended Action Plan
- A 3-column card layout:
  * Column 1 — "Next 30 Days" (Quick wins, low effort)
  * Column 2 — "1–3 Months" (Medium effort, high impact)
  * Column 3 — "3+ Months" (Strategic, long-term)
- Each column should have 4-5 specific bullet points

### SECTION 11: Risks & Watchouts
- 3-5 specific risks in Alert boxes with mitigation advice

### SECTION 12: Summary & Next Steps
- 3-sentence summary
- "Recommended Next Steps" as a numbered list (5 items)
- A CTA box: "Ready to accelerate your SEO growth? Schedule a strategy call today."

### APPENDIX: What to Export from Uber Suggest
- Checkbox list of exports that would improve the next version of this report

---

## SCRAPED WEBSITE CONTENT TO ANALYZE:
${markdownContent.substring(0, 25000)}

---

Now generate the complete HTML report. Remember: output ONLY the HTML document, starting with <!DOCTYPE html>.
`;

    // Try primary model, fall back on 503 overload errors
    const MODEL_CASCADE = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"];
    let result: any = null;
    let lastError: any = null;

    for (const modelName of MODEL_CASCADE) {
      try {
        console.log(`[API] Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        result = await model.generateContent(prompt);
        console.log(`[API] Success with model: ${modelName}`);
        break;
      } catch (err: any) {
        lastError = err;
        const is503 = err?.message?.includes("503") || err?.message?.includes("high demand") || err?.message?.includes("Service Unavailable");
        if (is503) {
          console.warn(`[API] Model ${modelName} overloaded, trying next...`);
          await new Promise(r => setTimeout(r, 1500));
          continue;
        }
        throw err;
      }
    }

    if (!result) throw lastError ?? new Error("All Gemini models are currently unavailable. Please try again in a moment.");

    const htmlReport = result.response.text();

    // Strip any accidental code fences from the LLM output
    const cleaned = htmlReport
      .replace(/^```html\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    console.log(`[API] Success! Report generated (${cleaned.length} chars).`);
    return NextResponse.json({ report: cleaned });

  } catch (error: any) {
    console.error("[API] Caught Error:", error);
    return NextResponse.json({ error: error?.message || "An unexpected error occurred" }, { status: 500 });
  }
}

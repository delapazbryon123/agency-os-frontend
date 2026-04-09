# Agency OS — AI-Powered SEO Report Generator

A full-stack web app that generates **professional, client-ready 11-section SEO reports** from any website URL in under 40 seconds. Built as a portfolio showcase for agency services.

![Agency OS](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-blue?logo=google) ![Firecrawl](https://img.shields.io/badge/Firecrawl-Scraper-orange)

---

## ✨ What It Does

1. **Scrapes** any website URL using the Firecrawl API (converts pages to clean Markdown)
2. **Analyzes** the content with Google Gemini AI acting as a senior SEO strategist
3. **Generates** a fully-styled, print-ready HTML SEO report with 11 sections

The report includes:
- Executive Summary with metric snapshot table
- Key Highlights (Wins + Challenges)
- Keyword Performance with opportunity tiers (Easy Win → Hard)
- Technical SEO Health scored table (✅ / ⚠️ / ❌)
- Schema Fix Guide (Rank Math / Yoast instructions)
- 3-Tier Backlink Building Roadmap
- 30-Day / 1–3 Month / 3+ Month Action Plan
- Risks & Watchouts + Summary & Next Steps

---

## 🛠 Tech Stack

| Layer | Tool | Purpose |
|---|---|---|
| Frontend | Next.js 16 + Tailwind CSS | UI, routing, server API routes |
| AI Brain | Google Gemini 2.5 Flash | SEO analysis & HTML report generation |
| Web Scraper | Firecrawl API | Converts websites to clean Markdown for AI |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/agency-os-frontend.git
cd agency-os-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API keys
Create a `.env.local` file in the root:
```env
FIRECRAWL_API_KEY="your_firecrawl_key"
GEMINI_API_KEY="your_gemini_key"
```
- Get a free Firecrawl key: [firecrawl.dev](https://firecrawl.dev)
- Get a free Gemini key: [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 📄 Usage

1. Enter any client website URL
2. Click **"Generate Full SEO Report"**
3. Wait ~20–40 seconds for the AI to scrape and analyze
4. The full report renders in a preview panel
5. Click **"Download HTML"** → open in Chrome → **Print → Save as PDF**

---

## 🔑 API Key Notes

- **Firecrawl**: Free tier available, generous scraping limits
- **Gemini**: Free tier (20 requests/day). The app auto-falls back from `gemini-2.5-flash` → `gemini-2.0-flash` → `gemini-flash-latest` if the primary model is overloaded
- API keys are stored in `.env.local` and **never exposed to the browser**

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts      ← Firecrawl + Gemini server logic
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              ← Main dashboard UI
```

---

*Built with Agency OS — AI-Powered Marketing Intelligence*

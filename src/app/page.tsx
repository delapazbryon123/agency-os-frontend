"use client";

import React, { useState, useRef, useCallback } from "react";
import { Loader2, Globe, Sparkles, Download, RotateCcw } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [reportUrl, setReportUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setReportUrl(null);
    setStep("🕸️ Scraping website content...");

    try {
      setTimeout(() => setStep("🧠 AI is analyzing SEO, content & technical health..."), 4000);
      setTimeout(() => setStep("📝 Writing your 11-section agency report..."), 10000);
      setTimeout(() => setStep("✨ Almost done — finalizing & styling..."), 18000);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to generate report.");

      setReport(data.report);

      // Create a blob URL so we can offer a download and render in iframe
      const blob = new Blob([data.report], { type: "text/html" });
      const blobUrl = URL.createObjectURL(blob);
      setReportUrl(blobUrl);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setStep("");
    }
  };

  const handleDownload = useCallback(() => {
    if (!report) return;
    const domainName = (() => { try { return new URL(url).hostname.replace("www.", ""); } catch { return "client"; } })();
    const filename = `${domainName}_SEO_Report_${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).replace(" ", "")}.html`;
    const blob = new Blob([report], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }, [report, url]);

  const handleReset = () => {
    setReport(null);
    setReportUrl(null);
    setError(null);
    setUrl("");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      {/* ───────── INPUT PHASE ───────── */}
      {!report && (
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center min-h-screen justify-center">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-yellow-500/30 text-sm font-medium text-yellow-500">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
              Agency OS · SEO Report Generator
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
              Client-Ready SEO Reports
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Enter a client's website URL. We'll scrape it, analyze it with AI, and generate a full 11-section professional SEO report — ready to download and send.
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">

              {!loading ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="url" className="text-sm font-medium text-zinc-300 ml-1">
                      Client Website URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-zinc-500" />
                      </div>
                      <input
                        type="url" id="url" name="url" value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                        placeholder="https://clientwebsite.com"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit"
                    className="group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl text-md font-bold text-black bg-yellow-500 hover:bg-yellow-400 transition-all overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Full SEO Report</span>
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center gap-6 py-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg">{step}</p>
                    <p className="text-zinc-400 text-sm mt-2">Generating your 11-section report. This takes ~20–40 seconds.</p>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-yellow-500 h-1.5 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
                  ⚠️ {error}
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["11 Sections", "Branded HTML", "PDF-Ready"].map((label, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-sm font-semibold text-yellow-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ───────── REPORT PHASE ───────── */}
      {report && reportUrl && (
        <div className="relative z-10 flex flex-col h-screen">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-6 py-3 bg-zinc-950 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              <span className="text-sm font-semibold text-white">SEO Report Ready</span>
              <span className="text-xs text-zinc-500 hidden md:inline">— {url}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-bold transition-all"
              >
                <Download className="h-4 w-4" />
                Download HTML
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                New Report
              </button>
            </div>
          </div>

          {/* Full-height iframe for the report */}
          <iframe
            ref={iframeRef}
            src={reportUrl}
            className="flex-1 w-full border-0"
            title="SEO Report"
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      )}
    </div>
  );
}

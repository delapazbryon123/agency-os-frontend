import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-yellow-500/30 text-sm font-medium text-yellow-500">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            Agency OS Beta
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
            Omnichannel Content Engine
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Enter a client's website URL to instantly generate a 30-day SEO strategy, social media calendar, and automated email campaigns.
          </p>
        </div>

        {/* Input Form Area */}
        <div className="w-full max-w-2xl">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl transition-all hover:bg-white/[0.04]">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="url" className="text-sm font-medium text-zinc-300 ml-1">
                  Target Website URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    className="block w-full pl-12 pr-4 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-md font-bold text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-black transition-all overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Generate Strategy Board</span>
              </button>
            </form>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white mb-1">1. Audit</div>
                <div className="text-sm text-zinc-400">Deep-dive SEO Analysis</div>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white mb-1">2. Strategize</div>
                <div className="text-sm text-zinc-400">30-Day Content Matrix</div>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white mb-1">3. Automate</div>
                <div className="text-sm text-zinc-400">Ready for n8n Webhooks</div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

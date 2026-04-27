import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="h-screen bg-[#050505] text-white font-sans p-6 overflow-hidden flex flex-col gap-4">
      {/* Header Section */}
      <header className="flex justify-between items-center h-16 border-b border-white/10 px-2 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-cyan-400">NEON_SNAKE</h1>
        </div>
        <div className="flex gap-8">
            <div className="text-right">
              <p className="text-[10px] uppercase text-white/40 tracking-widest">System Status</p>
              <p className="text-xl font-mono text-green-400">ONLINE</p>
            </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <main className="grid grid-cols-1 flex-1 lg:grid-cols-12 lg:grid-rows-6 gap-4 min-h-0">
         {/* Left panel */}
         <section className="hidden lg:flex col-span-3 row-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-6">
            <div>
              <p className="text-[10px] uppercase text-cyan-400 font-bold mb-4 tracking-widest">Level Status</p>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-white/60">Level</span>
                  <span className="text-lg font-mono">04</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs text-white/60">Speed</span>
                  <span className="text-lg font-mono">2.5x</span>
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <p className="text-[10px] uppercase text-pink-500 font-bold mb-1">Multi-plier</p>
                <p className="text-3xl font-black">x4.2</p>
              </div>
            </div>
         </section>

         {/* Center panel - Snake */}
         <section className="col-span-1 lg:col-span-6 lg:row-span-4 bg-black border-2 border-white/5 rounded-2xl relative overflow-hidden flex items-center justify-center group">
           {/* Grid Overlay */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
           
           <div className="relative z-10 w-full h-full flex items-center justify-center">
             <SnakeGame />
           </div>
         </section>

         {/* Right panel - Queue */}
         <section className="hidden lg:flex col-span-3 row-span-6 bg-white/5 border border-white/10 rounded-2xl p-5 flex-col">
            <p className="text-[10px] uppercase text-white/40 font-bold mb-4 tracking-widest">AI Generated Queue</p>
            <div className="space-y-3">
              <div className="group flex items-center gap-3 p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center shrink-0">
                  <div className="w-1 h-3 bg-cyan-400 animate-pulse"></div>
                  <div className="w-1 h-5 bg-cyan-400 animate-pulse mx-0.5"></div>
                  <div className="w-1 h-2 bg-cyan-400 animate-pulse"></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-cyan-200">Neon Pulse (AI Gen)</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">SynthNet</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center shrink-0 text-white/20 text-xs font-mono">02</div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-white/80">Cybernetic Drift</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">NeuralWave</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                <div className="w-10 h-10 bg-black rounded flex items-center justify-center shrink-0 text-white/20 text-xs font-mono">03</div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-white/80">Digital Horizon</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">Algorhythm</p>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-cyan-900 to-black border border-white/10 mb-4 flex items-center justify-center">
                <svg className="w-20 h-20 text-cyan-500/30" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"></path></svg>
              </div>
              <button className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-lg hover:bg-cyan-400 transition-colors">Generate New Set</button>
            </div>
         </section>

         {/* Bottom panel - MusicPlayer */}
         <section className="col-span-1 lg:col-span-9 lg:row-span-2 bg-[#0a0a0a] border border-cyan-500/20 rounded-2xl overflow-hidden flex items-center">
           <MusicPlayer />
         </section>
      </main>

      {/* Footer Bar */}
      <footer className="flex justify-between items-center text-[9px] text-white/30 uppercase tracking-[0.2em] border-t border-white/5 pt-2 shrink-0">
        <span>Built for: Neural-Synthetics Entertainment</span>
        <span>Build v0.4.82-Beta</span>
        <span>System Status: 100% Sync</span>
      </footer>
    </div>
  );
}

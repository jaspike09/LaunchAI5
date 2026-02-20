'use client';
import { useState, useEffect } from 'react';
import { Zap, Layout, MessageSquare, Cpu, ShieldCheck, BarChart3 } from 'lucide-react';

export default function CinematicAd() {
  const [mode, setMode] = useState('intro'); 

  useEffect(() => {
    const timers = [
      setTimeout(() => setMode('flash'), 3500),
      setTimeout(() => setMode('explanation'), 6500),
      setTimeout(() => setMode('form'), 11000)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* BACKGROUND VIDEO: Fixed to back, low opacity, high blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-110 opacity-30 grayscale blur-[2px]"
        >
          <source src="/MentorAI_vid.mp4" type="video/mp4" />
        </video>
        {/* Dark Vignette Overlay to focus eye on center */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-80" />
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        {mode === 'intro' && (
          <div className="animate-in fade-in zoom-in duration-1000">
            <h1 className="text-5xl md:text-7xl font-light italic leading-tight text-white drop-shadow-2xl">
              "Finally... the <br/>
              <span className="text-blue-500 font-black uppercase tracking-tighter neon-glow">easy button</span> <br/>
              <span className="text-3xl md:text-4xl">for starting a business!"</span>
            </h1>
          </div>
        )}

        {mode === 'flash' && (
          <div className="flex justify-center gap-8 animate-in fade-in duration-500">
            <div className="glass p-10 rounded-[3rem] flex flex-col items-center gap-4 border-blue-500/30">
               <Layout size={60} className="text-blue-400" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sovereign Funnels</p>
            </div>
          </div>
        )}

        {mode === 'explanation' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-12 duration-700">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">The Board of Directors</h2>
            <p className="text-slate-300 text-xl leading-relaxed max-w-xl mx-auto">
              6 Autonomous Agents that don't just suggest—they <span className="text-white font-bold underline decoration-blue-500">execute</span>. 
            </p>
            <div className="flex justify-center gap-6 text-blue-500/50">
                <Cpu className="animate-spin-slow" /> <ShieldCheck /> <BarChart3 />
            </div>
          </div>
        )}

        {mode === 'form' && (
          <div className="glass p-12 rounded-[4rem] border-white/10 shadow-2xl space-y-8 animate-in zoom-in duration-500 max-w-lg mx-auto">
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">Sail or Fail?</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Initialize Neural Audit</p>
            </div>
            <div className="space-y-4">
              <input type="email" placeholder="Executive Email" className="w-full bg-black/60 border border-white/5 p-6 rounded-2xl outline-none focus:border-blue-500 transition-colors" />
              <textarea placeholder="Your Vision..." className="w-full bg-black/60 border border-white/5 p-6 rounded-2xl h-32 outline-none focus:border-blue-500 resize-none transition-colors" />
            </div>
            <button onClick={() => window.location.href = '/audit'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 group">
              Validate Now <Zap fill="currentColor" className="group-hover:scale-125 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Brain, Zap, Layout, MessageSquare, Calendar, BarChart3, ShieldCheck, Cpu } from 'lucide-react';

export default function CinematicAd() {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
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
      {/* Background Video Layer */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 grayscale">
        <source src="/MentorAI_vid.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {mode === 'intro' && (
          <div className="animate-in fade-in zoom-in duration-1000">
            <h1 className="text-4xl md:text-6xl font-light italic leading-tight text-slate-100">
              "Finally... the <span className="text-blue-500 font-black uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">easy button</span> for starting a business!"
            </h1>
          </div>
        )}

        {mode === 'flash' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div className="glass p-8 rounded-3xl border-blue-500/30 flex flex-col items-center gap-4">
               <Layout size={40} className="text-blue-400" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em]">Agentic Funnel v4</p>
            </div>
            <div className="glass p-8 rounded-3xl border-emerald-500/30 flex flex-col items-center gap-4 mt-12">
               <MessageSquare size={40} className="text-emerald-400" />
               <p className="text-[10px] font-black uppercase tracking-[0.3em]">Lead Auto-Response</p>
            </div>
          </div>
        )}

        {mode === 'explanation' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Your Board of Directors</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              6 Autonomous Agents that don't just suggest—they <span className="text-white font-bold underline">execute</span>. 
              Ads, Messaging, Appointments, and Expenses. Fully agentic.
            </p>
            <div className="flex justify-center gap-4 text-blue-500">
                <Cpu className="animate-spin-slow" /> <ShieldCheck /> <BarChart3 />
            </div>
          </div>
        )}

        {mode === 'form' && (
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-6 animate-in zoom-in duration-500">
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase">Sail or Fail?</h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Enter your vision for a Neural Audit</p>
            </div>
            <div className="space-y-3">
              <input type="email" placeholder="Executive Email" className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 text-white" onChange={(e) => setEmail(e.target.value)} />
              <textarea placeholder="Describe your business idea..." className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl h-24 outline-none focus:border-blue-500 resize-none text-white" onChange={(e) => setIdea(e.target.value)} />
            </div>
            <button onClick={() => window.location.href = '/audit'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group">
              Validate Now <Zap fill="currentColor" className="group-hover:scale-125 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
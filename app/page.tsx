'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Brain, Zap } from 'lucide-react';

const supabase = createClient('https://yvgzyymjymrgjhhthgtj.supabase.co', 'YOUR_KEY');

export default function CinematicAd() {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState('intro'); // intro, flash, explanation, form

  useEffect(() => {
    const timer1 = setTimeout(() => setMode('flash'), 3000);
    const timer2 = setTimeout(() => setMode('explanation'), 6000);
    const timer3 = setTimeout(() => setMode('form'), 12000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent z-0" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {mode === 'intro' && (
          <div className="animate-in fade-in zoom-in duration-1000">
            <div className="w-48 h-48 bg-blue-500/20 rounded-full mx-auto mb-6 border border-blue-500/30 flex items-center justify-center">
              <Brain size={80} className="text-blue-400 animate-pulse" />
            </div>
            <h1 className="text-4xl font-light italic text-slate-200 leading-tight">
              "Finally... the <span className="text-blue-500 font-black uppercase tracking-tighter">easy button</span> for starting a business!"
            </h1>
          </div>
        )}

        {mode === 'flash' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
            <div className="bg-slate-800 aspect-video rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                <img src="/screen1.png" alt="App Preview" className="w-full h-full object-cover" />
            </div>
            <div className="bg-slate-800 aspect-video rounded-xl border border-white/10 shadow-2xl overflow-hidden mt-8">
                <img src="/screen2.png" alt="Dashboard Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        )}

        {mode === 'explanation' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Fully Agentic Board of Directors</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              6 Highly Trained AI Agents doing the heavy lifting. <br/>
              <span className="text-blue-400 font-bold">Creating Ads • Answering Messages • Tracking Expenses</span>
            </p>
          </div>
        )}

        {mode === 'form' && (
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-6 animate-in zoom-in duration-500">
            <h3 className="text-2xl font-black italic">Sail or Fail?</h3>
            <div className="space-y-4">
              <input type="email" placeholder="Executive Email" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500" onChange={(e) => setEmail(e.target.value)} />
              <textarea placeholder="Describe your business idea..." className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl h-24 outline-none focus:border-blue-500 resize-none" onChange={(e) => setIdea(e.target.value)} />
            </div>
            <button onClick={() => {
                 localStorage.setItem('userBusinessIdea', idea);
                 window.location.href = '/audit';
            }} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
              Validate Now <Zap fill="currentColor" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
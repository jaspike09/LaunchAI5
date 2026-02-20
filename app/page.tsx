'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, Brain, Zap } from 'lucide-react';

export default function CinematicAd() {
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [mode, setMode] = useState('intro');

  useEffect(() => {
    const t1 = setTimeout(() => setMode('flash'), 3000);
    const t2 = setTimeout(() => setMode('explanation'), 6000);
    const t3 = setTimeout(() => setMode('form'), 12000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {mode === 'intro' && (
          <div className="animate-in fade-in zoom-in duration-1000">
            <h1 className="text-4xl font-light italic">"Finally... the <span className="text-blue-500 font-black uppercase">easy button</span> for starting a business!"</h1>
          </div>
        )}
        {mode === 'flash' && <div className="text-blue-400 animate-pulse font-black text-2xl uppercase italic tracking-widest">Generating Neural Interface...</div>}
        {mode === 'explanation' && <h2 className="text-2xl font-black uppercase italic tracking-tighter">6 AI Agents doing the heavy lifting.</h2>}
        {mode === 'form' && (
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-6">
            <h3 className="text-2xl font-black italic uppercase">Sail or Fail?</h3>
            <input type="email" placeholder="Email" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl" onChange={(e) => setEmail(e.target.value)} />
            <textarea placeholder="Describe your business idea..." className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl h-24" onChange={(e) => setIdea(e.target.value)} />
            <button onClick={() => window.location.href = '/audit'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
              Validate Now <Zap fill="currentColor" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
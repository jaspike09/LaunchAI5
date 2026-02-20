'use client';
import { useState, useEffect } from 'react';

export default function AdPage() {
  const [mode, setMode] = useState('intro');

  useEffect(() => {
    const t = setTimeout(() => setMode('form'), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* ZOOMED ROBOT: Forced to corner so he's not "huge" in the center */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-20 grayscale scale-[1.7] translate-x-[15%] translate-y-[5%]"
        >
          <source src="/Director_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-90" />
      </div>

      <div className="relative z-10 max-w-xl w-full text-center">
        {mode === 'intro' && (
          <h1 className="text-5xl font-black italic uppercase tracking-tighter animate-in fade-in zoom-in duration-1000">
            The <span className="text-blue-500">Easy Button</span> <br/> for Business.
          </h1>
        )}

        {mode === 'form' && (
          <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-500">
            <h3 className="text-2xl font-black italic uppercase">Initialize Audit</h3>
            <input type="email" placeholder="Executive Email" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none" />
            <textarea 
               placeholder="Describe the venture..." 
               className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl h-24 resize-none" 
               onChange={(e) => localStorage.setItem('userBusinessIdea', e.target.value)}
            />
            <button onClick={() => window.location.href='/audit'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase shadow-xl shadow-blue-900/40">
              Validate Now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
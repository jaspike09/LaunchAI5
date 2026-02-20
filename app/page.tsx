'use client';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export default function CinematicAd() {
  const [mode, setMode] = useState('intro'); 

  useEffect(() => {
    const timers = [
      setTimeout(() => setMode('flash'), 3000),
      setTimeout(() => setMode('form'), 7000)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND: The Director Robot */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-30 grayscale contrast-125"
        >
          {/* This should be the new Director video we generated */}
          <source src="/Director_vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950 opacity-90" />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {mode === 'intro' && (
          <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter animate-in fade-in zoom-in duration-1000 leading-none">
            The <span className="text-blue-500">Easy Button</span> <br/> 
            <span className="text-2xl md:text-4xl">for starting a business.</span>
          </h1>
        )}

        {mode === 'form' && (
          <div className="glass p-10 rounded-[3rem] border border-white/10 shadow-2xl space-y-6 animate-in slide-in-from-bottom-10 duration-500 max-w-lg mx-auto">
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tight">Initialize Neural Audit</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em]">Proprietary Agentic Validation</p>
            </div>
            
            <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Executive Email" 
                  className="w-full bg-black/60 border border-white/5 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all" 
                />
                <textarea 
                  placeholder="Describe the venture..." 
                  className="w-full bg-black/60 border border-white/5 p-5 rounded-2xl h-24 outline-none focus:border-blue-500 resize-none transition-all text-sm" 
                  onChange={(e) => localStorage.setItem('userBusinessIdea', e.target.value)}
                />
            </div>

            <button 
              onClick={() => window.location.href = '/audit'} 
              className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20"
            >
              Validate Now <Zap fill="currentColor" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
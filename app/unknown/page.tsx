'use client';
import { useState } from 'react';

export default function UnknownPage() {
  const [step, setStep] = useState('input');
  const [idea, setIdea] = useState('');
  const score = 84; // Matches "pretty good score" script

  return (
    <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] max-w-2xl w-full text-center shadow-2xl">
        {step === 'input' ? (
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Business Thesis</h2>
            <textarea 
              onChange={(e) => setIdea(e.target.value)}
              className="w-full bg-black/40 border border-white/5 p-8 rounded-3xl h-40 outline-none focus:border-blue-500 transition-all text-xl"
              placeholder="e.g. A marketplace for freelance drone pilots..."
            />
            <button 
              onClick={() => { localStorage.setItem('userBusinessIdea', idea); setStep('report'); }}
              className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase tracking-widest"
            >
              Reveal My Data
            </button>
          </div>
        ) : (
          <div className="space-y-10 animate-in zoom-in duration-500">
            <div className="text-9xl font-black text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{score}%</div>
            
            <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] italic text-xl text-slate-300 leading-relaxed">
              "Not bad, {score}% is a pretty good score. Now let's take your <span className="text-white font-bold">"{idea}"</span> and turn it into cash flow. Stop dreaming and start launching!"
            </div>

            <button 
              onClick={() => window.location.href = 'https://buy.stripe.com/YOUR_LINK'}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-8 rounded-3xl font-black text-2xl uppercase shadow-2xl hover:scale-105 transition-transform"
            >
              Start the Next 30 Days
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
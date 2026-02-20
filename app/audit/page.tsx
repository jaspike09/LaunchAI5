'use client';
import { useState, useEffect } from 'react';

export default function AuditPage() {
  const [score, setScore] = useState(0);
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    // Scoring logic
    let s = 0;
    const target = 42; // Low score to force the pivot logic
    const int = setInterval(() => {
      if (s >= target) clearInterval(int);
      else { s++; setScore(s); }
    }, 50);

    // After 8 seconds, show robot pitch
    const timer = setTimeout(() => setShowRobot(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen w-screen bg-[#020617] text-white flex items-center justify-center p-6 relative">
      <div className="max-w-xl w-full text-center space-y-10">
        <div className="text-9xl font-black italic text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">{score}%</div>
        
        <div className="glass p-8 rounded-3xl border-red-500/20 bg-red-500/5">
            <h4 className="text-red-400 font-black uppercase tracking-widest text-xs mb-4">Pivot Recommendation</h4>
            <p className="text-slate-300 italic">"Physical retail has high overhead. Pivot to a Digital Subscription model to increase margins by 400%."</p>
        </div>

        {showRobot && (
          <div className="animate-in fade-in zoom-in duration-1000 space-y-6">
            <h2 className="text-2xl font-light italic leading-relaxed">
                "What are you waiting for? You have the ULTIMATE 6 member Board of Directors at your fingertips! Our highly trained agents are ready to put you on the path to success."
            </h2>
            <button onClick={() => window.location.href='https://buy.stripe.com/00w9AU4ww9qa7pSbOwfrW01'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase shadow-[0_0_40px_rgba(59,130,246,0.4)]">
                Stop Dreaming. Start Launching.
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
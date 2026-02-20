'use client';
import { useState, useEffect } from 'react';

export default function AuditPage() {
  const [score, setScore] = useState(0);
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    let s = 0;
    const target = 42;
    const int = setInterval(() => {
      if (s >= target) {
        clearInterval(int);
        setTimeout(() => setShowRobot(true), 2000);
      } else { s++; setScore(s); }
    }, 50);
  }, []);

  return (
    <main className="h-screen w-screen bg-[#020617] text-white flex items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full space-y-10">
        <div className="text-9xl font-black italic text-blue-500">{score}%</div>
        <p className="text-red-400 font-bold uppercase tracking-widest">Pivot Suggested: Digital First Strategy</p>
        {showRobot && (
          <div className="animate-in fade-in duration-1000 space-y-6">
            <h2 className="text-2xl italic">"Stop Dreaming. Start Launching."</h2>
            <button onClick={() => window.location.href='https://buy.stripe.com/link'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl">
                Unlock My Agents
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
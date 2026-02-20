'use client';
import { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

export default function AuditPage() {
  const [score, setScore] = useState(0);
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    let s = 0;
    const target = 42; 
    const int = setInterval(() => {
      if (s >= target) {
        clearInterval(int);
        setTimeout(() => setShowRobot(true), 2000); // Appear after the score settles
      } else {
        s++;
        setScore(s);
      }
    }, 50);
  }, []);

  return (
    <main className="h-screen w-screen bg-[#020617] text-white flex items-center justify-center p-6 relative">
      <div className="max-w-xl w-full text-center space-y-10">
        <div className="space-y-2">
            <div className="text-9xl font-black italic text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">{score}%</div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">Neural Viability Score</p>
        </div>
        
        <div className="glass p-6 rounded-3xl border-red-500/20 bg-red-500/5 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
            <div className="flex items-center justify-center gap-2 text-red-400 mb-2">
                <AlertTriangle size={16} />
                <h4 className="font-black uppercase tracking-widest text-[10px]">Critical Pivot Point</h4>
            </div>
            <p className="text-slate-300 italic text-sm">"Market saturation detected in local retail. Pivot to a <b>Direct-to-Consumer Subscription</b> model to reduce overhead by 65%."</p>
        </div>

        {showRobot && (
          <div className="animate-in zoom-in fade-in duration-700 space-y-6">
            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl italic text-lg leading-relaxed">
                "What are you waiting for? Our highly trained agents are ready to put you on the path to success. Stop Dreaming and Start Launching!"
            </div>
            <button onClick={() => window.location.href='https://buy.stripe.com/link'} className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl uppercase shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:bg-blue-500 flex items-center justify-center gap-3 transition-all">
                Access Your Board of Directors <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { Target, Users, DollarSign, Calculator, UserTie, ShieldCheck, Brain, Send } from 'lucide-react';

export default function Dashboard() {
  const [day, setDay] = useState(1);
  const [idea, setIdea] = useState('');

  useEffect(() => {
    setIdea(localStorage.getItem('userBusinessIdea') || 'Stealth Project');
  }, []);

  return (
    <div className="h-screen bg-[#020617] text-white flex overflow-hidden">
      {/* SIDEBAR: The GEMS Board */}
      <aside className="w-72 border-r border-white/5 p-6 flex flex-col bg-slate-950">
        <div className="font-black text-2xl mb-10 tracking-tighter italic">LAUNCH<span className="text-blue-500">AI</span></div>
        <nav className="space-y-1 flex-1">
          <div className="p-4 rounded-xl bg-blue-600/20 text-blue-400 text-xs font-bold border border-blue-500/20 mb-6">
            <Brain className="inline mr-2 w-4" /> Mission Control: Active
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Board of Directors</p>
          {['MentorAI', 'CoachAI', 'AccountantAI', 'LawyerAI', 'SecretaryAI'].map((gem) => (
            <button key={gem} className="w-full text-left p-3 text-xs opacity-60 hover:opacity-100 transition-all flex items-center hover:bg-white/5 rounded-lg">
              <UserTie className="mr-2 w-4 text-blue-400" /> {gem}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN COMMAND CENTER */}
      <main className="flex-1 flex flex-col p-10 overflow-y-auto space-y-10">
        <header className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-black italic uppercase tracking-tight">Day {day}: The Pivot</h2>
              <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Targeting Idea: {idea}</p>
            </div>
            <div className="glass px-6 py-3 rounded-2xl flex gap-8 border-white/5">
                <div className="text-center"><p className="text-[10px] text-slate-500 font-black uppercase">ROI</p><p className="text-emerald-400 font-bold">+850%</p></div>
                <div className="text-center"><p className="text-[10px] text-slate-500 font-black uppercase">Market</p><p className="text-blue-400 font-bold">Bullish</p></div>
            </div>
        </header>

        {/* The Intervention Card */}
        <section className="glass p-10 rounded-[3rem] border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-[10px] font-black opacity-10 uppercase tracking-[1em]">Directive: Alpha</div>
          <h3 className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
            <Brain size={16}/> The Mentor Intervention
          </h3>
          <p className="text-3xl font-light italic leading-relaxed text-slate-200">
             "Founder, your validation score for <span className="text-white font-bold">{idea}</span> is strong, but the margin is low. Accountant, calculate the $39 Founder tier floor. Secretary, draft the Outreach Script. What is the #1 problem we solve today?"
          </p>
          <div className="mt-8 flex gap-4">
             <input className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500" placeholder="State the problem..." />
             <button className="bg-blue-600 px-10 rounded-2xl font-black hover:bg-blue-500 transition-all uppercase tracking-widest text-sm">Deploy</button>
          </div>
        </section>

        {/* Action Board */}
        <div className="grid grid-cols-2 gap-6">
            <div className="glass p-8 rounded-3xl border-l-4 border-emerald-500">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">AccountantAI</p>
                <p className="text-lg text-slate-300">Target: $4,875 monthly revenue floor. Keep margins at 90%.</p>
            </div>
            <div className="glass p-8 rounded-3xl border-l-4 border-orange-500">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">CoachAI</p>
                <p className="text-lg text-slate-300 italic">Speed is your only moat. Send the launch script to 10 people now.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
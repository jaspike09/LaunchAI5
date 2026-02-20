'use client';
import { useState, useEffect } from 'react';
import { Layout, MessageSquare, Calendar, BarChart3, ShieldCheck, Cpu, User, Bell, Terminal, Activity } from 'lucide-react';

export default function Boardroom() {
  const [idea, setIdea] = useState('Neural Startup');
  const [consoleLog, setConsoleLog] = useState('DIRECTOR: Systems standing by. Awaiting executive input...');
  const [isLoading, setIsLoading] = useState(false);

  const agents = [
    { name: "Creative Lead", role: "Ads & Copy", icon: <Layout className="text-blue-400" />, color: "border-blue-500/20" },
    { name: "Comm-Bot", role: "Messaging", icon: <MessageSquare className="text-emerald-400" />, color: "border-emerald-500/20" },
    { name: "AccountantAI", role: "Finances", icon: <BarChart3 className="text-amber-400" />, color: "border-amber-500/20" },
  ];

  const executeAction = async (cmd: string) => {
    setIsLoading(true);
    setConsoleLog(`[COMMAND]: ${cmd} | INITIALIZING NEURAL ROUTE...`);
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, businessIdea: idea }),
      });
      const data = await res.json();
      setConsoleLog(`[DIRECTOR]: ${data.output}`);
    } catch (err) {
      setConsoleLog("SYSTEM ERROR: Neural link severed. Verify API configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto">
      {/* Header */}
      <nav className="flex justify-between items-center mb-16 glass p-8 rounded-[2rem]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black italic text-2xl neon-glow">L</div>
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter leading-none">Launch<span className="text-blue-500">AI</span></h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.4em] uppercase">Executive Boardroom</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] text-slate-500 font-bold uppercase">Status</span>
             <span className="text-xs text-emerald-500 font-bold flex items-center gap-2"><Activity size={12}/> AGENTS ONLINE</span>
           </div>
           <div className="w-12 h-12 glass rounded-full flex items-center justify-center border-white/10"><User size={20}/></div>
        </div>
      </nav>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {agents.map((agent, i) => (
          <div key={i} className={`glass p-10 rounded-[3rem] border-t-4 ${agent.color} transition-all hover:scale-[1.02]`}>
            <div className="bg-slate-900/50 w-16 h-16 rounded-3xl flex items-center justify-center mb-8">{agent.icon}</div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-1">{agent.name}</h3>
            <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mb-8">{agent.role}</p>
            <div className="h-[1px] w-full bg-white/5 mb-6" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               ACTIVE_PROTOCOL: 0.94
            </div>
          </div>
        ))}
      </div>

      {/* Console Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 glass p-10 rounded-[3rem] min-h-[300px] flex flex-col">
          <div className="flex items-center gap-3 mb-8 text-blue-400/50">
            <Terminal size={20} />
            <span className="font-black uppercase tracking-[0.3em] text-[10px]">Neural Director Output</span>
          </div>
          <div className="flex-1 font-mono text-sm md:text-base leading-relaxed text-blue-100/80 italic">
            {isLoading ? (
              <div className="animate-pulse">_ ROUTING REQUEST THROUGH AGENTS...</div>
            ) : (
              `> ${consoleLog}`
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
           <button onClick={() => executeAction("Launch Ad Campaign")} className="glass p-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all text-blue-400 hover:text-white border-blue-500/20">Launch Ads</button>
           <button onClick={() => executeAction("Analyze Finances")} className="glass p-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-slate-400 border-white/5">Audit Finances</button>
           <button onClick={() => executeAction("Source New Leads")} className="glass p-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all text-slate-400 border-white/5">Source Leads</button>
        </div>
      </div>
    </main>
  );
}
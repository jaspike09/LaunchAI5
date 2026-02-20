'use client';
import { useState, useEffect } from 'react';
import { Layout, MessageSquare, Calendar, BarChart3, ShieldCheck, Cpu, User, Bell, Terminal } from 'lucide-react';

export default function Boardroom() {
  const [idea, setIdea] = useState('');
  const [consoleLog, setConsoleLog] = useState('System ready. Awaiting executive orders...');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIdea(localStorage.getItem('userBusinessIdea') || 'Confidential Startup');
  }, []);

  const agents = [
    { name: "Creative Lead", role: "Ads & Copy", icon: <Layout className="text-blue-400" />, status: isLoading ? "Generating Assets..." : "Idle" },
    { name: "Comm-Bot", role: "Messaging", icon: <MessageSquare className="text-emerald-400" />, status: "Scanning Inbound" },
    { name: "AccountantAI", role: "Finances", icon: <BarChart3 className="text-amber-400" />, status: "Watching Margins" },
  ];

  const executeAction = async (cmd: string) => {
    setIsLoading(true);
    setConsoleLog(`[COMMAND RECEIVED]: Initiating ${cmd}...`);
    
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd, businessIdea: idea }),
      });
      const data = await res.json();
      setConsoleLog(data.output);
    } catch (err) {
      setConsoleLog("Error: Neural connection interrupted. Check API keys.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans">
      <nav className="flex justify-between items-center mb-8 glass p-6 rounded-2xl border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black italic shadow-[0_0_20px_rgba(59,130,246,0.5)]">L</div>
          <h1 className="text-xl font-black uppercase italic tracking-tighter">Launch<span className="text-blue-500">AI</span></h1>
        </div>
        <div className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 hidden md:block">Project: {idea}</div>
      </nav>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {agents.map((agent, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border-white/5 relative overflow-hidden group">
            <div className="mb-4">{agent.icon}</div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">{agent.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{agent.role}</p>
            <div className={`text-[10px] font-mono ${isLoading ? 'text-blue-400 animate-pulse' : 'text-emerald-500'}`}>
              ● {agent.status}
            </div>
          </div>
        ))}
      </div>

      {/* The Console & Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-blue-500/20 bg-blue-500/5">
          <div className="flex items-center gap-2 mb-6 text-blue-400">
            <Terminal size={18} />
            <h2 className="font-black uppercase tracking-widest text-xs">Live Agentic Console</h2>
          </div>
          <div className="bg-black/60 p-6 rounded-2xl border border-white/5 min-h-[150px] font-mono text-sm leading-relaxed text-slate-300">
            {isLoading ? "DIRECTOR: Routing to appropriate agents..." : consoleLog}
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/10 flex flex-col gap-3">
           <h3 className="font-black uppercase tracking-widest text-xs mb-4">Execute Commands</h3>
           <button onClick={() => executeAction("Create a Facebook Ad Campaign")} className="w-full bg-blue-600 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-500 transition-all">Launch Ad Campaign</button>
           <button onClick={() => executeAction("Draft a 30-Day Financial Strategy")} className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all">Audit Finances</button>
           <button onClick={() => executeAction("Scan for target leads in the local area")} className="w-full bg-white/5 border border-white/10 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all">Find Leads</button>
        </div>
      </div>
    </main>
  );
}
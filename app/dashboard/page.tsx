'use client';
import { Rocket } from 'lucide-react';

export default function Dashboard() {
  return (
    <main className="h-screen w-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <Rocket size={80} className="text-blue-500 animate-bounce mb-8" />
      <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mission Control Initializing</h1>
      <p className="text-slate-400 mt-4 max-w-md">
        The Board of Directors is assembling your workspace. 
        Deployment of Agentic Tools is 98% complete.
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-10 text-blue-500 font-bold uppercase tracking-widest text-xs hover:text-blue-400"
      >
        Return to Ad Center
      </button>
    </main>
  );
}
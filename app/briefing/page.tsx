'use client';
import { Rocket } from 'lucide-react';

export default function Briefing() {
  return (
    <main className="h-screen w-screen bg-black flex items-center justify-center relative">
      {/* THE REWARD: BLUE ROBOT VIDEO PLAYS HERE */}
      <video autoPlay playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/MentorAI_vid.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 mt-auto mb-20 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-1000">
         <button onClick={() => window.location.href='/signup'} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.5)] flex items-center gap-4">
           Access Dashboard <Rocket />
         </button>
      </div>
    </main>
  );
}
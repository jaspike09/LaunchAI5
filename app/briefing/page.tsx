'use client';
import { useState, useRef, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase from your provided keys
const _supabase = createClient(
  'https://yvgzyymjymrgjhhthgtj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z3p5eW1qeW1yZ2poaHRoZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5OTc1MzIsImV4cCI6MjA4NTU3MzUzMn0.814FVde267XILaw-VA76Yuk6Y6BVQpCr_5fAF2KtBFw'
);

export default function BriefingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [idea, setIdea] = useState('Your Venture');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedIdea = localStorage.getItem('userBusinessIdea');
    if (savedIdea) setIdea(savedIdea);
  }, []);

  const handleStart = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
    // Logic from your file: Show button after 5 seconds
    setTimeout(() => setShowBtn(true), 5000);
  };

  const handleFinalize = async () => {
    localStorage.setItem('isSubscribed', 'true');
    const { data: { user } } = await _supabase.auth.getUser();
    if (user) {
      await _supabase.from('profiles').update({ is_paid: true }).eq('id', user.id);
    }
    window.location.href = '/dashboard';
  };

  return (
    <main className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="glass p-8 md:p-12 rounded-[40px] max-w-3xl w-full text-center shadow-2xl relative z-10 border border-white/10">
        <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Secure Connection Established
        </div>

        <h2 className="text-3xl font-bold mb-8 tracking-tighter italic uppercase">Your Board is Assembling...</h2>

        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black mb-8 shadow-2xl">
            {/* Play Gate Logic from your HTML */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-900/98 z-20 flex flex-col items-center justify-center transition-opacity duration-500">
                  <button onClick={handleStart} className="group flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 transition">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                      <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Initialize Briefing</span>
                  </button>
              </div>
            )}

            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              onEnded={() => setIsEnded(true)}
            >
                <source src="/MentorAI_vid.mp4" type="video/mp4" />
            </video>
        </div>

        <p className="text-slate-400 mb-8">
            Analyzing vision for: <span className="text-blue-400 font-semibold italic">"{idea}"</span>
        </p>

        <button 
          onClick={handleFinalize}
          className={`inline-block px-10 py-4 rounded-2xl font-bold transition-all duration-700 shadow-lg ${
            showBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          } ${isEnded ? 'bg-green-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'}`}
        >
          {isEnded ? 'Enter Mission Control' : 'Enter Mission Control'} 
          <span className="ml-2">→</span>
        </button>
      </div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
    </main>
  );
}
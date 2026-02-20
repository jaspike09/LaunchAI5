'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, ArrowRight, Rocket, ShieldCheck } from 'lucide-react';

export default function BriefingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
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
    // Match your logic: show dashboard button after 5 seconds
    setTimeout(() => setShowButton(true), 5000);
  };

  return (
    <main className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      <div className="glass p-8 md:p-12 rounded-[40px] max-w-3xl w-full text-center shadow-2xl relative z-10 border border-white/10">
        <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
          <ShieldCheck size={12} className="inline mr-2" /> Secure Connection Established
        </div>

        <h2 className="text-3xl font-bold mb-8 tracking-tighter">Your Board is Assembling...</h2>

        {/* Video Container with Fixed Aspect Ratio */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black mb-8 shadow-2xl">
          
          {/* Play Gate Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-slate-900/98 z-20 flex flex-col items-center justify-center transition-opacity duration-500">
              <button 
                onClick={handleStart}
                className="group flex flex-col items-center gap-4 cursor-pointer"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
                  <Play fill="white" size={24} className="ml-1" />
                </div>
                <span className="text-blue-400 font-black tracking-[0.3em] text-[10px] uppercase">Initialize Briefing</span>
              </button>
            </div>
          )}

          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={() => setShowButton(true)}
          >
            <source src="/MentorAI_vid.mp4" type="video/mp4" />
          </video>
        </div>

        <p className="text-slate-400 mb-8 font-medium">
          Analyzing vision for: <span className="text-blue-400 font-semibold italic">"{idea}"</span>
        </p>

        {/* Dashboard Button with Reveal Logic */}
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className={`inline-flex items-center gap-3 bg-blue-600 px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-blue-500 transition-all duration-700 shadow-lg shadow-blue-600/30 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          Enter Mission Control <Rocket size={18} />
        </button>
      </div>
    </main>
  );
}
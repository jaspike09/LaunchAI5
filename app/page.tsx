'use client';
import { useState, useRef, useEffect } from 'react';

export default function LaunchAI_Ad() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const script = [
    "Are you trying to start a business and don't know how or where to start?",
    "This is the first ever AI conducted Business Launcher.",
    "The power of the world's smartest professionals at your fingertips.",
    "See if your idea can stand up to brutal validation! Try it now for free!"
  ];

  const handleStart = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
    // Show the button after 3 seconds so they watch the start of the video
    setTimeout(() => setShowBtn(true), 3000); 
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setScriptIndex((prev) => (prev < 3 ? prev + 1 : prev));
      }, 4500); // Cycles the text every 4.5 seconds
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <main className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Glow (Exact match to success.html) */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

      {/* The Center Glass Card (Exact match to success.html) */}
      <div className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[40px] max-w-3xl w-full text-center shadow-2xl relative z-10 border border-white/10">
        
        <div className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
            Neural Interface Ready
        </div>

        {/* The Dynamic Script */}
        <h2 className="text-2xl md:text-4xl font-black mb-8 tracking-tighter italic min-h-[90px] flex items-center justify-center">
          {script[scriptIndex]}
        </h2>

        {/* Video Container (Exact match to success.html) */}
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black mb-8 shadow-2xl">
            
            {/* The Play Gate */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-900/95 z-20 flex flex-col items-center justify-center transition-opacity duration-500">
                  <button onClick={handleStart} className="group flex flex-col items-center gap-4 cursor-pointer">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform">
                         {/* Play Triangle */}
                         <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                      </div>
                      <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Initialize Neural Interface</span>
                  </button>
              </div>
            )}

            {/* The Video */}
            <video ref={videoRef} className="w-full h-full object-cover" playsInline>
                <source src="/Director_vid.mp4" type="video/mp4" />
            </video>
        </div>

        {/* The Call to Action */}
        <button 
          onClick={() => window.location.href = '/unknown'}
          className={`inline-block bg-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all duration-700 shadow-xl shadow-blue-600/30 ${
            showBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          Start Free Scan →
        </button>

      </div>
    </main>
  );
}
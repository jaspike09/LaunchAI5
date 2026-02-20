'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase tools for this file
const supabase = createClient(
  'https://yvgzyymjymrgjhhthgtj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Z3p5eW1qeW1yZ2poaHRoZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5OTc1MzIsImV4cCI6MjA4NTU3MzUzMn0.814FVde267XILaw-VA76Yuk6Y6BVQpCr_5fAF2KtBFw'
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // 1. If not logged in, go to signup
      if (!user) {
        window.location.href = '/signup';
        return;
      }

      // 2. Check if they are a paid customer
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_paid')
        .eq('id', user.id)
        .single();

      if (!profile?.is_paid) {
        // 3. If they haven't paid, kick them back to the validation/stripe page
        window.location.href = '/unknown';
      } else {
        setLoading(false);
      }
    };
    checkAccess();
  }, []);

  if (loading) return <div className="h-screen w-screen bg-slate-950 flex items-center justify-center text-blue-500 font-mono">AUTHENTICATING...</div>;

  return (
    <main className="min-h-screen bg-[#020617] text-white p-8">
      <h1 className="text-2xl font-black italic uppercase">The Boardroom</h1>
      {/* Rest of your 6-Agent Dashboard UI goes here */}
    </main>
  );
}
import './globals.css';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

// NO 'use client' here!
export const metadata = {
  title: 'LaunchAI Sovereign',
  description: 'The War Room for 30-Day Revenue',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
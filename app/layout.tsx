import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import MainNav from '../components/MainNav';

export const metadata: Metadata = {
  title: 'GG Tracker',
  description: 'High-performance life tracking system'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: '"Avenir Next", "Futura", "Trebuchet MS", sans-serif' }}
      >
        <header className="sticky top-0 z-20 border-b border-[rgba(203,223,144,0.2)] bg-[rgba(15,30,56,0.68)] backdrop-blur-md">
          <div className="gg-shell flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-[rgba(203,223,144,0.82)]">
                GG Tracker
              </p>
              <p className="text-sm text-[rgba(238,244,220,0.75)]">Life Operating System</p>
            </div>
            <MainNav />
          </div>
        </header>
        <main className="gg-shell py-7">{children}</main>
      </body>
    </html>
  );
}

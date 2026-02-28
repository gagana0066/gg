import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'GG Tracker',
  description: 'High-performance life tracking system'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 antialiased">
        <header className="bg-gray-800 p-4">
          <nav className="container mx-auto flex space-x-4">
            <a href="/" className="hover:underline">Dashboard</a>
            <a href="/goals" className="hover:underline">Goals</a>
            <a href="/habits" className="hover:underline">Habits</a>
            <a href="/journal" className="hover:underline">Journal</a>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}

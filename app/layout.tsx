import './globals.css';
import React from 'react';
import Logo from '@/components/Logo';

export const metadata = {
  title: 'Youtuber Pro',
  description: 'Automatize a criação e upload de vídeos para YouTube',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-steel text-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <header className="mb-8 rounded-xl bg-gradient-to-r from-gray-800/90 to-gray-900/90 border border-gray-700/50 px-6 py-4 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <div className="flex items-center justify-between">
              <Logo size="md" showText={true} />
              <nav className="rounded-lg bg-gradient-to-r from-gray-700/80 to-gray-800/80 border border-gray-600/50 px-4 py-2 text-sm font-semibold text-gray-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                Dashboard
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}





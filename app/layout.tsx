import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Youtuber',
  description: 'Automatize a criação e upload de vídeos para YouTube',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Youtuber</h1>
            <nav className="text-sm text-gray-500">Dashboard</nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}





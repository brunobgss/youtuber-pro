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
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <header className="mb-8 rounded-xl bg-white px-6 py-4 shadow-youtube">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white text-xl font-bold">
                  Y
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Youtuber</h1>
                  <p className="text-sm text-gray-500">Automação de Vídeos</p>
                </div>
              </div>
              <nav className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
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





import type { Config } from 'tailwindcss';

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF0000',
          hover: '#CC0000',
          light: '#FF3333',
        },
        youtube: {
          DEFAULT: '#FF0000',
          dark: '#CC0000',
          light: '#FF3333',
        },
        status: {
          authorized: '#22c55e',
          pending: '#f59e0b',
          reauth: '#ef4444',
          quota: '#f97316',
        },
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
        'youtube': '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
} satisfies Config;





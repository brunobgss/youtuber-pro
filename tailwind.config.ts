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
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        status: {
          authorized: '#22c55e',
          pending: '#f59e0b',
          reauth: '#ef4444',
          quota: '#f97316',
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
} satisfies Config;





import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Ícone */}
      <div className={`${iconSizes[size]} relative`}>
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente para efeito 3D */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4444" stopOpacity="1" />
              <stop offset="30%" stopColor="#FF0000" stopOpacity="1" />
              <stop offset="70%" stopColor="#FF0000" stopOpacity="1" />
              <stop offset="100%" stopColor="#CC0000" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="logoHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            {/* Sombra para efeito 3D */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
              <feOffset dx="1" dy="1" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Brilho */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Sombra do quadrado */}
          <rect
            x="5"
            y="5"
            width="56"
            height="56"
            rx="12"
            ry="12"
            fill="#000000"
            opacity="0.3"
          />
          
          {/* Quadrado principal com cantos arredondados - efeito 3D */}
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="12"
            ry="12"
            fill="url(#logoGradient)"
            stroke="#AA0000"
            strokeWidth="0.5"
            filter="url(#shadow)"
          />
          
          {/* Highlight no topo para efeito 3D */}
          <rect
            x="6"
            y="6"
            width="52"
            height="20"
            rx="10"
            ry="10"
            fill="url(#logoHighlight)"
          />
          
          {/* Play button - triângulo branco */}
          <path
            d="M 24 20 L 24 44 L 44 32 Z"
            fill="#FFFFFF"
            opacity="0.98"
            filter="url(#glow)"
          />
          
          {/* Contorno sutil do play button */}
          <path
            d="M 24 20 L 24 44 L 44 32 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            opacity="0.5"
          />
          
          {/* Setas expandindo - superior direita */}
          <path
            d="M 50 10 L 54 14 M 52 12 L 52 12"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 50 10 L 52 8 M 54 14 L 56 12"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
          
          {/* Setas expandindo - inferior esquerda */}
          <path
            d="M 14 54 L 10 50 M 12 52 L 12 52"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 14 54 L 12 56 M 10 50 L 8 52"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Texto */}
      {showText && (
        <div className="flex items-center gap-2">
          <h1 className={`${textSizes[size]} font-bold`}>
            <span 
              className="text-red-500"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF0000 50%, #CC0000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 4px rgba(255, 0, 0, 0.4))',
              }}
            >
              Youtuber
            </span>
            <span className="ml-2 inline-flex items-center">
              <span 
                className="px-2.5 py-0.5 rounded-full text-white text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 2px 4px rgba(255, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                }}
              >
                PRO
              </span>
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

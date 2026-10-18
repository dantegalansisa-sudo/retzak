interface LogoProps {
  light?: boolean;
  className?: string;
}

export function LogoMark({ size = 46 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id="egSun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6FD39B" />
          <stop offset="1" stopColor="#3A9A68" />
        </linearGradient>
      </defs>
      <circle className="logo-sun" cx="33" cy="13" r="8" fill="url(#egSun)" />
      <g className="logo-rays" stroke="#4BB37D" strokeWidth="2.4" strokeLinecap="round">
        <path d="M33 1.5v2.5M44.5 13H42M41.1 4.9l-1.8 1.8" />
      </g>
      <path d="M8 24h30l-5 18H3z" fill="currentColor" />
      <path d="M18.3 24l-5 18M28.6 24l-5 18M5.6 33h30" stroke="var(--logo-grid, #fff)" strokeWidth="2" />
    </svg>
  );
}

export default function Logo({ light, className = '' }: LogoProps) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''} ${className}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">Egersa</span>
        <span className="logo-sub">Solar</span>
      </span>
    </span>
  );
}

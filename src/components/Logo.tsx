interface LogoProps {
  light?: boolean;
  className?: string;
}

export function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.78} viewBox="0 0 64 50" aria-hidden="true" className="logo-mark">
      <defs>
        <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD54A" />
          <stop offset="1" stopColor="#F5A300" />
        </linearGradient>
      </defs>
      <g className="logo-rays" stroke="url(#sunGrad)" strokeWidth="3.2" strokeLinecap="round">
        <path d="M34 2v6" />
        <path d="M22 6l3 5" />
        <path d="M46 6l-3 5" />
        <path d="M13 14l5 3.5" />
        <path d="M55 14l-5 3.5" />
        <path d="M9 25h6" />
        <path d="M53 25h6" />
      </g>
      <path d="M20 26a14 14 0 0 1 28 0z" fill="url(#sunGrad)" />
      <path d="M13 29h46l-7 19H6z" fill="currentColor" />
      <path d="M28.3 29l-7 19M43.6 29l-7 19M9.5 38.5h46" stroke="var(--logo-grid, #FBF7EE)" strokeWidth="2.2" />
    </svg>
  );
}

export default function Logo({ light, className = '' }: LogoProps) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''} ${className}`}>
      <LogoMark />
      <span className="logo-text">
        <span className="logo-name">Retzak</span>
        <span className="logo-sub">Solar Tech</span>
      </span>
    </span>
  );
}

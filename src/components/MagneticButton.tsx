import { useRef, useState } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  type?: 'button' | 'submit';
  external?: boolean;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.3,
  type = 'button',
  external,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  const isExternal = external ?? (href ? href.startsWith('http') : false);

  return (
    <div
      ref={ref}
      className="magnetic"
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
      >
        {href ? (
          <a
            href={href}
            onClick={onClick}
            className={className}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {children}
          </a>
        ) : (
          <button type={type} onClick={onClick} className={className}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}

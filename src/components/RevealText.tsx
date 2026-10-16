import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASINGS } from '../utils/easings';

interface Line {
  text: string;
  className?: string;
}

interface RevealTextProps {
  /** Plain string, or several lines (each can carry its own class, e.g. gold accent). */
  children: string | Line[];
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
}

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

const wordVariants = {
  hidden: { y: '110%', rotate: 2 },
  visible: (c: { i: number; delay: number }) => ({
    y: 0,
    rotate: 0,
    transition: { duration: 0.85, delay: c.delay + c.i * 0.06, ease: EASINGS.premium },
  }),
};

export default function RevealText({
  children,
  className = '',
  delay = 0,
  tag = 'h2',
  immediate = false,
}: RevealTextProps) {
  const Tag = MOTION_TAGS[tag];
  const lines: Line[] = typeof children === 'string' ? [{ text: children }] : children;
  let index = 0;

  // The observer sits on the (unclipped) heading itself: the moving words start
  // fully clipped by their masks, so observing them would never fire.
  const trigger = immediate
    ? { animate: 'visible' }
    : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } };

  const rendered: ReactNode[] = lines.map((line, li) => (
    <span key={li} className={`reveal-line ${line.className ?? ''}`}>
      {line.text.split(' ').map((word, wi) => {
        const i = index++;
        return (
          <span key={wi} className="reveal-word">
            <motion.span style={{ display: 'inline-block' }} variants={wordVariants} custom={{ i, delay }}>
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  ));

  return (
    <Tag
      className={`reveal ${className}`}
      aria-label={lines.map((l) => l.text).join(' ')}
      initial="hidden"
      {...trigger}
    >
      <span aria-hidden="true">{rendered}</span>
    </Tag>
  );
}

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 250 });
  const springY = useSpring(y, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 769px)');
    const update = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle('has-cursor', mq.matches);
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest('a, button, input, select, textarea, label, [data-cursor]'));
    };
    const md = () => setDown(true);
    const mu = () => setDown(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', md);
    window.addEventListener('mouseup', mu);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', md);
      window.removeEventListener('mouseup', mu);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className={`cursor-ring${hover ? ' cursor--hover' : ''}${down ? ' cursor--down' : ''}`}
        style={{ x: springX, y: springY }}
      />
    </>
  );
}

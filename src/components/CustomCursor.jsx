import { useEffect, useRef, useCallback } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 }); // current rendered position
  const target = useRef({ x: -100, y: -100 }); // target (actual mouse) position
  const rafId = useRef(null);
  const isTouchDevice = useRef(false);

  // ── lerp helper ──
  const lerp = (a, b, t) => a + (b - a) * t;

  // ── animation loop: 60fps smooth follow ──
  const animate = useCallback(() => {
    const ease = 0.15; // lerp factor — lower = more lag
    pos.current.x = lerp(pos.current.x, target.current.x, ease);
    pos.current.y = lerp(pos.current.y, target.current.y, ease);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    // ── touch detection ──
    const onTouchStart = () => {
      isTouchDevice.current = true;
      el.classList.add('custom-cursor--hidden');
    };

    // ── mouse move ──
    const onMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      // Reveal cursor on first mouse move (in case it was hidden)
      if (!isTouchDevice.current) {
        el.classList.remove('custom-cursor--hidden');
      }

      // Determine what we're hovering
      const hoveredEl = e.target;
      const isView = hoveredEl?.closest('[data-cursor="view"]');
      const isLink = hoveredEl?.closest('a, button, [role="button"], input[type="submit"]');

      el.classList.toggle('custom-cursor--view', !!isView);
      el.classList.toggle('custom-cursor--link', !isView && !!isLink);
    };

    // ── mouse down / up → click shrink ──
    const onMouseDown = () => el.classList.add('custom-cursor--clicking');
    const onMouseUp = () => el.classList.remove('custom-cursor--clicking');

    // ── hide when cursor leaves viewport ──
    const onMouseLeave = () => el.classList.add('custom-cursor--hidden');
    const onMouseEnter = () => {
      if (!isTouchDevice.current) el.classList.remove('custom-cursor--hidden');
    };

    // bind events
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { once: true, passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // kick off animation loop
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span className="custom-cursor__label">View</span>
    </div>
  );
}

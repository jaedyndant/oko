import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Loader.css';

const TITLE_LETTERS = ['Ō', 'K', 'Ō'];

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const lettersRef = useRef([]);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Letters fade in one by one over 1.5s
      tl.to(lettersRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.5,
        ease: 'power2.out',
      });

      // 2. Gold line grows from 0% to 100% over 2.5s (starts with letters)
      tl.to(
        lineRef.current,
        {
          width: '100%',
          duration: 2.5,
          ease: 'power2.inOut',
        },
        0 // start at the same time as letter animation
      );

      // 3. Subtitle fades in at 50% progress of the line (1.25s in)
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        1.25
      );

      // 4. After line reaches 100%, loader slides up to reveal the page
      tl.to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
        },
        '+=0.3' // small pause after line completes
      );
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loader" ref={loaderRef}>
      <h1 className="loader__title">
        {TITLE_LETTERS.map((letter, i) => (
          <span
            key={i}
            className="loader__letter"
            ref={(el) => (lettersRef.current[i] = el)}
          >
            {letter}
          </span>
        ))}
      </h1>

      <div className="loader__line-wrapper">
        <div className="loader__line" ref={lineRef} />
      </div>

      <p className="loader__subtitle" ref={subtitleRef}>
        — Architecture Studio —
      </p>
    </div>
  );
};

export default Loader;

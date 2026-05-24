import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.story-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="flex-col items-center justify-center" style={{ position: 'relative', zIndex: 1, paddingTop: '10vh' }}>
      <div className="text-center story-card glass-panel" style={{ marginBottom: '4rem', padding: '2rem' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>Our Love Story</h2>
        <p style={{ margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-dark)' }}>A journey written in the stars.</p>
      </div>

      <div className="flex" style={{ flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        <div className="story-card glass-panel" style={{
          padding: '3rem 2rem',
          maxWidth: '400px',
        }}>
          <h3 className="text-sage" style={{ position: 'relative', zIndex: 1 }}>The First Meeting</h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-heading)', position: 'relative', zIndex: 1 }}>June 2021</span>
          <p style={{ position: 'relative', zIndex: 1 }}>It was a warm summer evening. We met through mutual friends at a small vintage cafe. A simple conversation over coffee turned into hours of laughter, and we both knew this was the start of something magical.</p>
        </div>

        <div className="story-card glass-panel" style={{
          padding: '3rem 2rem',
          maxWidth: '400px',
        }}>
          <h3 className="text-sage" style={{ position: 'relative', zIndex: 1 }}>The Proposal</h3>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', fontFamily: 'var(--font-heading)', position: 'relative', zIndex: 1 }}>December 2024</span>
          <p style={{ position: 'relative', zIndex: 1 }}>Under a canopy of fairy lights during a winter getaway, Mohamed asked the easiest question of Sara's life. Tears of joy, a beautiful ring, and a promise of forever sealed the moment.</p>
        </div>
      </div>
    </section>
  );
}

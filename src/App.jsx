import React, { useEffect, useRef } from 'react'
import Guestbook from './components/Guestbook'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import MediaUploader from './components/MediaUploader'
import Gallery from './components/Gallery'
import MagicDust from './components/MagicDust'
import gsap from 'gsap'

function App() {
  const heroRef = useRef(null);

  useEffect(() => {
    // Initial fade in
    gsap.fromTo('.hero-element', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out', delay: 0.2 }
    );

    // Subtle moving ambient orbs (No SVG filters, just raw CSS blurs)
    gsap.to('.orb-1', {
      x: 'random(-100, 100)', y: 'random(-100, 100)',
      duration: 'random(10, 15)', repeat: -1, yoyo: true, ease: 'sine.inOut'
    });
    gsap.to('.orb-2', {
      x: 'random(-100, 100)', y: 'random(-100, 100)',
      duration: 'random(10, 15)', repeat: -1, yoyo: true, ease: 'sine.inOut'
    });

    // Slowly rotating center geometric ornament
    gsap.to('.rotating-ornament', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none'
    });

    // Parallax text effect based on mouse movement
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      gsap.to('.parallax-text', { x: x, y: y, duration: 1, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Moving, Elegant Hero Section */}
      <section ref={heroRef} style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        padding: '2rem'
      }}>
        
        {/* Ambient Blurred Background Orbs */}
        <div className="orb-1" style={{ position: 'absolute', top: '10%', left: '10%', width: '50vw', height: '50vw', background: 'var(--color-pink)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.6, zIndex: 0 }}></div>
        <div className="orb-2" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '60vw', height: '60vw', background: 'var(--color-sage)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.5, zIndex: 0 }}></div>

        {/* Floating Particles */}
        <MagicDust />

        <div className="text-center parallax-text" style={{ position: 'relative', zIndex: 2 }}>
          
          {/* Top Ornament */}
          <div className="hero-element rotating-ornament" style={{ marginBottom: '2rem', color: 'var(--color-gold)', display: 'flex', justifyContent: 'center' }}>
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" stroke="currentColor" strokeWidth="1" />
              <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          </div>

          <h1 className="hero-element" dir="rtl" style={{ 
            color: 'var(--color-dark)', 
            margin: '0', 
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            lineHeight: 1.1,
            fontWeight: 400
          }}>
            سارة
          </h1>
          
          <div className="hero-element" style={{ 
            color: 'var(--color-gold)', 
            fontSize: '3rem', 
            fontFamily: 'var(--font-heading)',
            margin: '-1rem 0'
          }}>
            و
          </div>
          
          <h1 className="hero-element" dir="rtl" style={{ 
            color: 'var(--color-dark)', 
            margin: '0', 
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            lineHeight: 1.1,
            fontWeight: 400
          }}>
            محمد
          </h1>
          
          {/* Bottom Subtitle */}
          <div className="hero-element" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ 
              fontSize: '1.2rem', 
              color: 'var(--color-dark)', 
              letterSpacing: '5px',
              textTransform: 'uppercase',
              opacity: 0.9,
              borderTop: '1px solid var(--color-gold)',
              borderBottom: '1px solid var(--color-gold)',
              padding: '0.5rem 2rem'
            }}>
              نحتفل بحبنا
            </span>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Countdown />
        <Guestbook />
        <Schedule />
        <MediaUploader />
        <Gallery />
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-cream)', textAlign: 'center', padding: '4rem 2rem', position: 'relative', zIndex: 2 }}>
        <p style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>لا يسعنا الانتظار للاحتفال معكم.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0 }}>© ٢٠٢٦ سارة ومحمد. صُنع بحب.</p>
      </footer>
    </div>
  )
}

export default App

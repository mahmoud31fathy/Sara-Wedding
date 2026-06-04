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
          
          {/* Top Invitation Text */}
          <div className="hero-element" dir="rtl" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-dark)', margin: 0, opacity: 0.8 }}>بسم الله الرحمن الرحيم</p>
            <p style={{ fontSize: '1.4rem', color: 'var(--color-gold)', fontFamily: 'var(--font-heading)', margin: 0, textAlign: 'center', maxWidth: '800px', lineHeight: 1.6 }}>
              {'{ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا }'}
            </p>
            <p style={{ fontSize: '1.5rem', color: 'var(--color-dark)', margin: 0, marginTop: '1rem' }}>بكل الحب والامتنان،</p>
            <p style={{ fontSize: '1.8rem', color: 'var(--color-dark)', fontFamily: 'var(--font-heading)', margin: 0, marginTop: '0.5rem' }}>
              يتشرفان
            </p>
          </div>

          <h1 className="hero-element" dir="rtl" style={{ 
            color: 'var(--color-dark)', 
            margin: '0', 
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            lineHeight: 1.1,
            fontWeight: 400
          }}>
            محمد
          </h1>
          
          <div className="hero-element" style={{ 
            color: 'var(--color-gold)', 
            fontSize: '2.5rem', 
            fontFamily: 'var(--font-heading)',
            margin: '-0.5rem 0'
          }}>
            و
          </div>
          
          <h1 className="hero-element" dir="rtl" style={{ 
            color: 'var(--color-dark)', 
            margin: '0', 
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            lineHeight: 1.1,
            fontWeight: 400
          }}>
            سارة
          </h1>
          
          {/* Bottom Invitation Text */}
          <div className="hero-element" dir="rtl" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '1.8rem', color: 'var(--color-dark)', fontFamily: 'var(--font-heading)', margin: 0 }}>
              بدعوتكم لمشاركتهما فرحة الزفاف.
            </p>
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
        <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0 }}>© ٢٠٢٦ محمد وسارة. صُنع بحب.</p>
      </footer>
    </div>
  )
}

export default App

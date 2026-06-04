import React, { useEffect } from 'react'
import Hero3D from './components/Hero3D'
import Guestbook from './components/Guestbook'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import MediaUploader from './components/MediaUploader'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Staggered letters animation for the hero text
    gsap.fromTo('.hero-text-word', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.7)', stagger: 0.15, delay: 0.5 }
    );
    
    // Fade in the rest of the hero elements
    gsap.fromTo('.hero-fade', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, delay: 1.5 }
    );
  }, []);

  const heroTitle = "سارة و محمد";

  return (
    <>
      {/* 3D Scene serves as a fixed background for the hero area */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Hero3D />
      </div>

      {/* Hero Typography Overlay */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, background: 'transparent', pointerEvents: 'none' }}>
        <div className="text-center" style={{ padding: '2rem 4rem' }}>
          <h1 dir="rtl" style={{ color: 'var(--color-dark)', margin: 0, textShadow: '0 2px 20px rgba(255,255,255,0.8)', overflow: 'hidden', lineHeight: 1.2 }}>
            {heroTitle.split(' ').map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                <span className="hero-text-word" style={{ display: 'inline-block' }}>
                  {word}
                </span>
                {wordIdx < 2 && (
                  <span className="hero-text-word" style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
                )}
              </span>
            ))}
          </h1>
          <p className="hero-fade" style={{ fontSize: '1.5rem', color: 'var(--color-dark)', margin: '0.5rem 0', fontWeight: 'bold' }}>١٢ يونيو ٢٠٢٦ • ٨:٠٠ مساءً</p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-fade" style={{ position: 'absolute', bottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.7 }}>
          <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-dark)' }}>مرر للاستكشاف</span>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--color-gold)' }}></div>
        </div>
      </section>

      {/* Content Sections that scroll over the 3D background */}
      {/* We use transparent background so the 3D rings can still be seen behind the glass panels! */}
      <div style={{ position: 'relative', zIndex: 2, background: 'transparent' }}>
        <Countdown />
        <Guestbook />
        <Schedule />
        <MediaUploader />
        <Gallery />
        <RSVP />
      </div>
      
      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-dark)', color: 'var(--color-cream)', textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 2 }}>
        <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>لا يسعنا الانتظار للاحتفال معكم.</p>
        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>© ٢٠٢٦ سارة ومحمد. صُنع بحب.</p>
      </footer>
    </>
  )
}

export default App

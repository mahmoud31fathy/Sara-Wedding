import React, { useEffect } from 'react'
import Guestbook from './components/Guestbook'
import Countdown from './components/Countdown'
import Schedule from './components/Schedule'
import MediaUploader from './components/MediaUploader'
import Gallery from './components/Gallery'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Staggered letters animation for the hero text
    gsap.fromTo('.hero-text-word', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15, delay: 0.2 }
    );
    
    // Fade in the rest of the hero elements
    gsap.fromTo('.hero-fade', 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5, delay: 1 }
    );
  }, []);

  const heroTitle = "سارة و محمد";

  return (
    <div style={{ backgroundColor: 'var(--color-cream)' }}>
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        zIndex: 1, 
        overflow: 'hidden',
        padding: '2rem'
      }}>
        
        {/* Elegant Corner Decorations (SVG) */}
        <div className="hero-fade" style={{ position: 'absolute', top: '2rem', left: '2rem', opacity: 0.4 }}>
           <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="var(--color-gold)" strokeWidth="1.5">
             <path d="M0,0 L100,0 L100,100" fill="none" />
             <path d="M15,15 L85,15 L85,85" fill="none" />
           </svg>
        </div>
        <div className="hero-fade" style={{ position: 'absolute', bottom: '2rem', right: '2rem', opacity: 0.4, transform: 'rotate(180deg)' }}>
           <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="var(--color-gold)" strokeWidth="1.5">
             <path d="M0,0 L100,0 L100,100" fill="none" />
             <path d="M15,15 L85,15 L85,85" fill="none" />
           </svg>
        </div>

        {/* Center Content */}
        <div className="text-center" style={{ 
          padding: '4rem', 
          border: '1px solid rgba(212, 175, 55, 0.4)',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 10px 50px rgba(62, 54, 46, 0.05)',
          width: '90vw',
          maxWidth: '500px',
          aspectRatio: '1/1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          
          <div className="hero-fade" style={{ color: 'var(--color-sage)', marginBottom: '1.5rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <h1 dir="rtl" style={{ 
            color: 'var(--color-dark)', 
            margin: '0 0 1rem 0', 
            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
            lineHeight: 1.1 
          }}>
            {heroTitle.split(' ').map((word, wordIdx) => (
              <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                <span className="hero-text-word" style={{ display: 'inline-block' }}>
                  {word}
                </span>
                {wordIdx < 2 && (
                  <span className="hero-text-word" style={{ display: 'inline-block', width: '0.2em' }}>&nbsp;</span>
                )}
              </span>
            ))}
          </h1>
          
          <p className="hero-fade" style={{ 
            fontSize: '1.1rem', 
            color: 'var(--color-dark)', 
            margin: 0,
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            نحتفل بحبنا
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-fade" style={{ position: 'absolute', bottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', opacity: 0.7 }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-dark)' }}>مرر للاستكشاف</span>
          <div style={{ width: '1px', height: '60px', backgroundColor: 'var(--color-gold)' }}></div>
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
        <div style={{ marginBottom: '2rem', color: 'var(--color-gold)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <p style={{ margin: '0 0 1rem 0', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>لا يسعنا الانتظار للاحتفال معكم.</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.6, margin: 0 }}>© ٢٠٢٦ سارة ومحمد. صُنع بحب.</p>
      </footer>
    </div>
  )
}

export default App

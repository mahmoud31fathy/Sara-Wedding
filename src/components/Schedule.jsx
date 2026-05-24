import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, GlassWater, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  { time: '4:00 PM', title: 'Welcome Drinks', icon: <GlassWater size={24} />, desc: 'Refreshments upon arrival.' },
  { time: '5:00 PM', title: 'The Ceremony', icon: <Clock size={24} />, desc: 'The moment we say "I do".' },
  { time: '6:30 PM', title: 'Dinner Reception', icon: <MapPin size={24} />, desc: 'A feast to celebrate our union.' },
  { time: '8:00 PM', title: 'Dancing & Celebration', icon: <Music size={24} />, desc: 'Dance the night away!' },
];

export default function Schedule() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="schedule" style={{ position: 'relative', zIndex: 1 }}>
      <div className="text-center glass-panel" style={{ marginBottom: '4rem', padding: '2rem', display: 'inline-block', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>Wedding Schedule</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>What to expect on our special day.</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {events.map((evt, idx) => (
          <div key={idx} className="event-item flex items-center gap-4 glass-panel" style={{
            marginBottom: '2rem',
            padding: '2rem',
            borderLeft: '4px solid var(--color-gold)'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '1rem',
              borderRadius: '50%',
              color: 'var(--color-gold)',
              boxShadow: '0 2px 10px rgba(212, 175, 55, 0.1)',
              position: 'relative',
              zIndex: 1
            }}>
              {evt.icon}
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h3 className="text-dark" style={{ marginBottom: '0.25rem', fontSize: '1.25rem' }}>{evt.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-dark)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <Clock size={16} /> <span>{evt.time}</span>
              </div>
              <p style={{ marginBottom: 0, fontSize: '0.95rem', color: 'var(--color-dark)' }}>{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

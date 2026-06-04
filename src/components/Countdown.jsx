import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: June 12, 2026 at 20:00:00 (8 PM)
    const targetDate = new Date('2026-06-12T20:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
      <div className="glass-panel" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '3rem 2rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '2rem' 
      }}>
        <h2 className="text-gold" style={{ margin: 0, textAlign: 'center' }}>العد التنازلي ليومنا الكبير</h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          flexWrap: 'wrap',
          direction: 'ltr'
        }}>
          {[
            { label: 'يوم', value: timeLeft.days },
            { label: 'ساعة', value: timeLeft.hours },
            { label: 'دقيقة', value: timeLeft.minutes },
            { label: 'ثانية', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.6)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              minWidth: '100px',
              border: '1px solid rgba(212, 175, 55, 0.2)'
            }}>
              <span className="text-gold" style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>
                {item.value.toLocaleString('ar-EG')}
              </span>
              <span className="text-dark" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

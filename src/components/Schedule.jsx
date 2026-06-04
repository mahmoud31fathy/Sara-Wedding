import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, CalendarDays } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.event-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="schedule" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
      <div className="text-center glass-panel" style={{ margin: '0 auto 4rem auto', padding: '2rem', width: 'max-content', maxWidth: '90%' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>الزمان والمكان</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>ننتظركم لمشاركتنا فرحتنا</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0 1rem' }}>
        
        {/* Date and Time Box */}
        <div className="event-item glass-panel" style={{ padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
          <h3 className="text-dark" style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--color-gold)' }}>موعد الزفاف</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-dark)', fontSize: '1.2rem' }}>
              <CalendarDays size={24} color="var(--color-gold)" />
              <span>١٢ يونيو ٢٠٢٦</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-dark)', fontSize: '1.2rem' }}>
              <Clock size={24} color="var(--color-gold)" />
              <span>الدخول يبدأ الساعة ٨:٠٠ مساءً</span>
            </div>
          </div>
        </div>

        {/* Location Box */}
        <div className="event-item glass-panel" style={{ padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
          <h3 className="text-dark" style={{ marginBottom: '1.5rem', fontSize: '1.8rem', color: 'var(--color-gold)' }}>موقع الحفل</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--color-dark)', fontSize: '1.2rem', marginBottom: '2rem' }}>
            <MapPin size={24} color="var(--color-gold)" />
            <span>قاعة BENZAY، البيروم، مركز فاقوس، الشرقية</span>
          </div>

          <div style={{ width: '100%', height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <iframe 
              src="https://maps.google.com/maps?q=قاعة%20BENZAY,%20Faqous,%20Al-Sharqia%20Governorate&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(100%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}

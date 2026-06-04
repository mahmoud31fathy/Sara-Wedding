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
            <span>فندق فورسيزونز نايل بلازا، القاهرة</span>
          </div>

          <div style={{ width: '100%', height: '350px', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0624021204646!2d31.22692227632616!3d30.035035274928236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c83a7f6f17%3A0xc3c5b5dc26f5d341!2sFour%20Seasons%20Hotel%20Cairo%20at%20Nile%20Plaza!5e0!3m2!1sen!2seg!4v1717524941655!5m2!1sen!2seg" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
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

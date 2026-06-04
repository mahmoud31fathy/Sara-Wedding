import React, { useState } from 'react';

export default function RSVP() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <section id="rsvp" style={{ position: 'relative', zIndex: 1, paddingBottom: '8rem' }}>
      <div className="text-center glass-panel" style={{ margin: '0 auto 3rem auto', padding: '2rem', width: 'max-content', maxWidth: '90%' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>تأكيد الحضور</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>يرجى إعلامنا إذا كنتم ستتمكنون من الحضور بحلول ١ مايو ٢٠٢٦.</p>
      </div>

      <div className="glass-panel" style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {status === 'success' ? (
            <div className="text-center fade-in">
              <h3 className="text-sage" style={{ fontSize: '2rem' }}>شكراً لكم!</h3>
              <p>لقد تلقينا تأكيد حضوركم. لا يسعنا الانتظار للاحتفال معكم!</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>
                إرسال تأكيد آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>الاسم الكامل</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="الاسم الثلاثي"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>البريد الإلكتروني</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="example@email.com"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="attendance" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>هل ستحضر؟</label>
                <select 
                  id="attendance" 
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <option value="yes">بكل سرور</option>
                  <option value="no">أعتذر عن الحضور</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'جاري الإرسال...' : 'إرسال التأكيد'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

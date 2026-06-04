import React, { useState } from 'react';

export default function Guestbook() {
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
    <section id="guestbook" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem', paddingTop: '4rem' }}>
      <div className="text-center glass-panel" style={{ margin: '0 auto 3rem auto', padding: '2rem', width: 'max-content', maxWidth: '90%' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>أمنيات للعروسين</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>اترك رسالة أو أمنية لسارة ومحمد في يومهما الخاص.</p>
      </div>

      <div className="glass-panel" style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {status === 'success' ? (
            <div className="text-center fade-in">
              <h3 className="text-sage" style={{ fontSize: '2rem' }}>شكراً لك!</h3>
              <p>تم إرسال أمنيتك الجميلة بنجاح. ستسعد سارة ومحمد بقراءتها!</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>
                كتابة أمنية أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="guest-name" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>الاسم</label>
                <input 
                  type="text" 
                  id="guest-name" 
                  required 
                  placeholder="اسمك الكريم"
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <label htmlFor="wish-message" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>أمنيتك أو رسالتك</label>
                <textarea 
                  id="wish-message" 
                  required 
                  placeholder="اكتب أمنياتك للعروسين هنا..."
                  rows="5"
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ marginTop: '1.5rem', width: '100%', padding: '1rem' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الأمنية'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

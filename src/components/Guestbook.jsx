import React, { useState } from 'react';

export default function Guestbook() {
  const [status, setStatus] = useState('idle');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const name = document.getElementById('guest-name').value;
    const message = document.getElementById('wish-message').value;

    const url = "https://script.google.com/macros/s/AKfycbyF0tN81vXMHgcEmDy1icTL96nKHHxnYF1sEec7hiTTcESiKZK8u4d1YGULoJsVyv2QzA/exec";

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: name,
          message: message
        })
      });
      
      // no-cors doesn't return a readable response, but if it didn't throw, it likely succeeded
      setStatus('success');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setStatus('error');
    }
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
          ) : status === 'error' ? (
            <div className="text-center fade-in">
              <h3 style={{ color: '#d9534f', fontSize: '1.5rem' }}>حدث خطأ</h3>
              <p>عذراً، لم نتمكن من إرسال أمنيتك. يرجى المحاولة مرة أخرى.</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>
                حاول مرة أخرى
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

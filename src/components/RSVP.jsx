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
      <div className="text-center glass-panel" style={{ marginBottom: '3rem', padding: '2rem', display: 'inline-block', left: '50%', transform: 'translateX(-50%)' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>RSVP</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>Please let us know if you can make it by May 1st, 2026.</p>
      </div>

      <div className="glass-panel" style={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {status === 'success' ? (
            <div className="text-center fade-in">
              <h3 className="text-sage" style={{ fontSize: '2rem' }}>Thank You!</h3>
              <p>We have received your RSVP. We can't wait to celebrate with you!</p>
              <button className="btn btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-col gap-4" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  placeholder="Jane Doe"
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
                <label htmlFor="email" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder="jane@example.com"
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
                <label htmlFor="attendance" style={{ fontWeight: 'bold', color: 'var(--color-dark)' }}>Will you attend?</label>
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
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send RSVP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

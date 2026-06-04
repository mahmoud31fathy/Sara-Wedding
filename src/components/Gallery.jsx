import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function loadMedia() {
      try {
        const savedUploads = JSON.parse(localStorage.getItem('my_wedding_uploads') || '[]');
        setMedia(savedUploads);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();

    window.addEventListener('mediaUploaded', loadMedia);

    return () => {
      window.removeEventListener('mediaUploaded', loadMedia);
    };
  }, []);

  if (loading) {
    return (
      <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
        <div className="text-center">
          <p style={{ color: 'var(--color-dark)' }}>جاري تحميل المعرض...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ padding: '4rem 2rem', position: 'relative', zIndex: 1 }}>
        <div className="text-center" style={{ color: '#d9534f' }}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (media.length === 0) {
    return null; // Don't show the gallery section at all if there's no media yet
  }

  return (
    <section id="gallery" style={{ padding: '0 2rem 6rem 2rem', position: 'relative', zIndex: 1 }}>
      <div className="text-center glass-panel" style={{ margin: '0 auto 4rem auto', padding: '2rem', width: 'max-content', maxWidth: '90%' }}>
        <h2 className="text-gold" style={{ margin: 0 }}>مشاركاتي</h2>
        <p style={{ margin: '0 auto', color: 'var(--color-dark)' }}>الصور ومقاطع الفيديو التي قمت برفعها.</p>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1rem',
        direction: 'rtl'
      }}>
        {media.map((item) => (
          <a 
            key={item.id} 
            href={item.webViewLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass-panel"
            style={{ 
              display: 'block', 
              position: 'relative', 
              aspectRatio: '1', 
              overflow: 'hidden',
              padding: 0,
              textDecoration: 'none',
              border: '2px solid rgba(212, 175, 55, 0.3)'
            }}
          >
            {item.thumbnailLink ? (
              <img 
                src={item.thumbnailLink.replace('=s220', '=s600')} 
                alt={item.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                loading="lazy"
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.4)' }}>
                {item.type === 'video' ? 'فيديو' : 'صورة'}
              </div>
            )}
            
            {item.type === 'video' && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Play size={32} fill="currentColor" />
              </div>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}

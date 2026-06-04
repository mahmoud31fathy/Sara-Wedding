import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

export default function MediaUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setStatus('uploading');
    setProgress(0);

    const file = files[0]; // For simplicity, handle one file at a time right now

    try {
      // 1. Get Resumable Upload URL from our backend
      const res = await fetch('/api/upload-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type,
        })
      });

      if (!res.ok) {
        let errText = await res.text();
        try {
          const errJson = JSON.parse(errText);
          errText = errJson.error || errText;
        } catch(e) {}
        throw new Error(`Server returned ${res.status}: ${errText}`);
      }
      const { uploadUrl } = await res.json();

      // 2. Upload the raw file directly to Google Drive using XMLHttpRequest for progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl, true);
        
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            setProgress(Math.round(percentComplete));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response);
          } else {
            reject(new Error(`Upload to Google Drive failed (${xhr.status}): ${xhr.responseText}`));
          }
        };

        xhr.onerror = () => reject(new Error('Network error during upload'));

        xhr.send(file);
      });

      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setProgress(0);
      }, 3000);

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Unknown error occurred');
      setStatus('error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <section id="upload" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
      <div className="glass-panel text-center" style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-gold" style={{ marginBottom: '1rem', marginTop: 0 }}>شاركنا لحظاتك</h2>
        <p style={{ color: 'var(--color-dark)', marginBottom: '2rem' }}>
          يرجى تحميل الصور ومقاطع الفيديو الخاصة بك هنا لنحتفظ بها كذكرى جميلة.
        </p>

        {status === 'success' ? (
          <div style={{ color: 'var(--color-sage)' }}>
            <CheckCircle size={48} style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>تم الرفع بنجاح! شكراً لك.</h3>
          </div>
        ) : status === 'error' ? (
          <div style={{ color: '#d9534f' }}>
            <AlertCircle size={48} style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>حدث خطأ أثناء الرفع. يرجى المحاولة مرة أخرى.</h3>
            <p style={{ marginTop: '0.5rem', direction: 'ltr', fontSize: '0.8rem', background: '#ffebee', padding: '0.5rem', borderRadius: '4px' }}>
              Error Details: {errorMessage}
            </p>
            <button className="btn btn-outline" onClick={() => setStatus('idle')} style={{ marginTop: '1rem' }}>حاول مرة أخرى</button>
          </div>
        ) : (
          <div 
            onClick={() => !isUploading && fileInputRef.current?.click()}
            style={{
              border: '2px dashed rgba(212, 175, 55, 0.5)',
              borderRadius: 'var(--radius-lg)',
              padding: '3rem 2rem',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              backgroundColor: 'rgba(255,255,255,0.4)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*,video/*"
              style={{ display: 'none' }}
            />

            {isUploading ? (
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h4 style={{ color: 'var(--color-dark)' }}>جاري الرفع... {progress}%</h4>
                <div style={{ 
                  width: '100%', 
                  height: '10px', 
                  backgroundColor: 'rgba(212, 175, 55, 0.2)', 
                  borderRadius: '5px',
                  marginTop: '1rem',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${progress}%`, 
                    height: '100%', 
                    backgroundColor: 'var(--color-gold)',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ) : (
              <>
                <UploadCloud size={48} color="var(--color-gold)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
                <h3 style={{ color: 'var(--color-dark)', margin: 0 }}>اضغط هنا لاختيار صورة أو فيديو</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', marginTop: '0.5rem' }}>يتم الرفع بالجودة الأصلية إلى السحابة مباشرة</p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

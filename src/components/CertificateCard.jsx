import { Download, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function CertificateCard({ certificate, onDownload }) {
  const handleDownload = async () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([certificate.certificateContent], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `Certificate-${certificate.courseName.replace(/\s+/g, '-')}-${new Date().getTime()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Certificate downloaded!');
      if (onDownload) onDownload();
    } catch (error) {
      console.error('Download certificate error:', error);
      toast.error('Failed to download certificate');
    }
  };

  const completedDate = new Date(certificate.completedDate);

  return (
    <div style={{
      padding: '1.5rem',
      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(217, 119, 6, 0.05))',
      border: '2px solid rgba(251, 191, 36, 0.2)',
      borderRadius: '0.75rem',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{
        display: 'flex',
        alignItems: 'start',
        gap: '1.5rem'
      }}>
        <div style={{
          padding: '1rem',
          background: '#fbbf24',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink
        }}>
          <FileText size={32} color="#ffffff" />
        </div>

        <div style={{ flex }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            {certificate.courseName}
          </h3>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '0.5rem'
          }}>
            Instructor: {certificate.instructorName}
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin
          }}>
            Completed: {completedDate.toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#fbbf24',
            color: '#4c0519',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f59e0b';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fbbf24';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Download size={18} />
          Download
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import CertificateCard from './CertificateCard';
import LoadingSpinner from './LoadingSpinner';

export default function CertificatesDisplay() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/certificates/${user.uid}`);
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast.error('Failed to load certificates');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{
      padding: '2rem',
      background: '#ffffff',
      borderRadius: '0.75rem',
      marginTop: '2rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '0.75rem',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Award size={24} color="#ffffff" />
        </div>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0
        }}>
          Your Certificates
        </h2>
      </div>

      {certificates.length === 0 ? (
        <div style={{
          padding: '3rem 2rem',
          background: '#f9fafb',
          borderRadius: '0.75rem',
          textAlign: 'center',
          color: '#6b7280',
          border: '2px dashed #d1d5db'
        }}>
          <Award size={48} style={{
            margin: '0 auto 1rem',
            color: '#d1d5db'
          }} />
          <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
            No certificates yet
          </p>
          <p>Complete courses to earn certificates!</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate._id}
              certificate={certificate}
              onDownload={fetchCertificates}
            />
          ))}
        </div>
      )}
    </div>
  );
}

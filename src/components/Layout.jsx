import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { loading } = useAuth();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff', color: '#1f2937' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      {loading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.35)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ padding: '18px 22px', background: 'rgba(255,255,255,0.9)', borderRadius: '0.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
            <LoadingSpinner fullPage={false} label="Please wait…" />
          </div>
        </div>
      )}
    </div>
  );
}

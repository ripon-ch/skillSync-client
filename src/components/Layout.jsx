import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../context/AuthContext';

function LoadingOverlay({ label }) {
  return (
    <div className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="p-5 bg-white/90 rounded-xl shadow-lg">
        <LoadingSpinner fullPage={false} label={label} />
      </div>
    </div>
  );
}

export default function Layout() {
  const { loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {loading && <LoadingOverlay label="Please wait…" />}
    </div>
  );
}

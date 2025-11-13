export default function LoadingSpinner({ fullPage = true, label = 'Loading…' }) {
  const width = '60px';
  const height = '60px';

  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
      <style>{`
        @keyframes spin360 { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { transform: scale(0.9); opacity: 0.85; } 50% { transform: scale(1.05); opacity: 1; } }
      `}</style>
      <div style={{ position: 'relative', width, height }}>
        {/* Outer gradient ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '9999px',
          background: 'conic-gradient(from 0deg, #facc15, #4906BF, #220359, #facc15)',
          filter: 'blur(0.2px)',
          animation: 'spin360 1.2s linear infinite'
        }} />
        {/* Mask to create ring */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: 'var(--bg, #fff)' }} />
        {/* Inner rotating arc */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '9999px',
          borderTop: '3px solid rgba(73,6,191,0.9)', borderRight: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: '3px solid transparent',
          animation: 'spin360 0.9s linear infinite'
        }} />
        {/* Center dot */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width, height, borderRadius: '9999px', background: '#facc15', boxShadow: '0 0 18px rgba(250, 204, 21, 0.8)', animation: 'pulse 1.2s ease-in-out infinite' }} />
        </div>
      </div>
      <p style={{ color: '#64748b', fontWeight: '500', letterSpacing: '0.02em' }}>{label}</p>
    </div>
  );

  if (!fullPage) return spinner;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
      {spinner}
    </div>
  );
}

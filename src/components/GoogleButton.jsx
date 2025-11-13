export default function GoogleButton({ onClick, disabled, text = 'Sign in with Google', ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '10px 16px',
        background: '#ffffff',
        color: '#3c4043',
        border: '1px solid #dadce0',
        borderRadius: '6px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7  : 1
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = '#f7f8f8')}
      onMouseOut={(e) => (e.currentTarget.style.background = '#ffffff')}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" style={{ display: 'block' }} aria-hidden="true" focusable="false">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.4 29.3 36 24 36c-3.332 0-6.033-2.701-6.033-6.032 c0-3.331 2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814C17.461 2.268 15.365 1.25 12.545 1.25 c-6.343 0-11.5 5.157-11.5 11.5c0 6.343 5.157 11.5 11.5 11.5c6.343 0 11.5-5.157 11.5-11.5c0-1.2-.1-2.3-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.2 18.9 12.6 24 12.6c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.2 4 9.5 8.4 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.2C29.3 36 26.8 37 24 37c-5.2 0-9.6-3.5-11.2-8.2l-6.6 5.1C9.4 39.6 16.1 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.5 5.7-6.6 7.1l6.3 5.2C37.7 38.3 40 31.7 40 24c0-1.2-.1-2.3-.4-3.5z"/>
      </svg>
      {text}
    </button>
  );
}

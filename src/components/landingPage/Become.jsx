import React from "react";

export default function Become() {
  return (
    <div style={{ padding: '4rem 2rem', background: '#f3f4f6' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', marginBottom: '3rem' }}>
        Become an Instructor
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ width: '300px', textAlign: 'center', padding: '2rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>Share Your Knowledge</h3>
          <p style={{ fontSize: '0.85rem', color: '#374151', marginBottom: '1rem' }}>Teach students worldwide</p>
          <button style={{
            background: '#6d28d9', color: '#fff', padding: '0.75rem 1.5rem', fontWeight: '700',
            border: 'none', borderRadius: '2rem', cursor: 'pointer', transition: 'all 0.3s ease'
          }}
          onMouseOver={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow='0 12px 30px rgba(109,40,217,0.4)'; }}
          onMouseOut={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='none'; }}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

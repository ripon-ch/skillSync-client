import React from "react";

export default function CTA() {
  return (
    <div style={{
      padding: '4rem 2rem', background: '#6d28d9', color: '#fff', textAlign: 'center',
      borderRadius: '2rem', margin: '2rem auto', maxWidth: '800px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>
        Start Learning Today!
      </h2>
      <p style={{ fontSize: '1rem', color: '#e0e7ff', marginBottom: '2rem' }}>
        Join our platform and get access to thousands of courses.
      </p>
      <button style={{
        background: '#fbbf24', color: '#1f2937', padding: '1rem 2rem', fontWeight: '700',
        border: 'none', borderRadius: '2rem', cursor: 'pointer', transition: 'all 0.3s ease'
      }}
      onMouseOver={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow='0 12px 30px rgba(251,191,36,0.4)'; }}
      onMouseOut={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='none'; }}>
        Get Started
      </button>
    </div>
  );
}

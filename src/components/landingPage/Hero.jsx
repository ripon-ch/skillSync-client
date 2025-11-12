import React from "react";

export default function Hero() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '4rem 2rem', minHeight: '550px', background: '#6d28d9', color: '#fff', flexWrap: 'wrap'
    }} className="hero-responsive">
      <div style={{ flex: 1, minWidth: '280px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>
          Learn Anything, Anytime
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#e0e7ff', marginBottom: '2rem', lineHeight: '1.6' }}>
          Join thousands of learners and experts to upgrade your skills online.
        </p>
        <button style={{
          background: '#fbbf24', color: '#1f2937', padding: '1rem 2rem', fontWeight: '700',
          border: 'none', borderRadius: '2rem', cursor: 'pointer', transition: 'all 0.3s ease'
        }}
        onMouseOver={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow='0 12px 30px rgba(251, 191, 36, 0.4)'; }}
        onMouseOut={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='none'; }}>
          Get Started
        </button>
      </div>
      <div style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
          alt="Hero" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
      </div>
    </div>
  );
}

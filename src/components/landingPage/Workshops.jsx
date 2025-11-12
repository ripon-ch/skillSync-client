import React from "react";

export default function Workshops() {
  return (
    <div style={{ padding: '4rem 2rem', background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
            alt="Workshop" style={{ maxWidth: '100%', borderRadius: '1rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1f2937', marginBottom: '1rem' }}>
            Join Our Free Workshops
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6' }}>
            Get hands-on experience and learn from industry experts in our weekly free workshops.
          </p>
          <button style={{
            background: '#5E3FDE', color: '#fff', padding: '1rem 2rem', fontWeight: '700',
            border: 'none', borderRadius: '2rem', cursor: 'pointer', transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(94,63,222,0.3)'
          }}
          onMouseOver={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow='0 12px 30px rgba(94,63,222,0.4)'; }}
          onMouseOut={e => { e.target.style.transform='translateY(0)'; e.target.style.boxShadow='0 8px 20px rgba(94,63,222,0.3)'; }}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Events() {
  return (
    <div style={{ padding: '4rem 2rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', marginBottom: '3rem' }}>
        Community Events
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {['Hackathon', 'Webinar', 'Workshop'].map((event, i) => (
          <div key={i} style={{ width: '220px', textAlign: 'center', padding: '1.5rem', background: '#e0f2fe', borderRadius: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{event}</h3>
            <p style={{ fontSize: '0.85rem', color: '#1e3a8a' }}>Join us to learn and network</p>
          </div>
        ))}
      </div>
    </div>
  );
}

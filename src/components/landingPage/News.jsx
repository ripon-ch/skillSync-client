import React from "react";

export default function News() {
  return (
    <div style={{ padding: '4rem 2rem', background: '#f9fafb' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', marginBottom: '3rem' }}>
        Latest News
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {['Platform Update', 'New Courses', 'Award Winner'].map((news, i) => (
          <div key={i} style={{ width: '220px', textAlign: 'center', padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{news}</h3>
            <p style={{ fontSize: '0.85rem', color: '#374151' }}>Read more about our latest update</p>
          </div>
        ))}
      </div>
    </div>
  );
}

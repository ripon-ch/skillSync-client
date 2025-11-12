import React from "react";

export default function FeaturedInstructor() {
  return (
    <div style={{ padding: '4rem 2rem', background: '#f9fafb' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '900', marginBottom: '3rem' }}>
        Featured Instructors
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {['Alice', 'Bob', 'Charlie'].map((name, i) => (
          <div key={i} style={{ width: '250px', textAlign: 'center', padding: '1.5rem', background: '#fff', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <img src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }} />
            <h3 style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Expert in Web Development</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

export default function Stats() {
  return (
    <div style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
      <div style={{
        padding: '2rem', background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem',
        borderRadius: '2rem', color: '#fff', maxWidth: '1100px', margin: '0 auto'
      }}>
        <div style={{ flex: 0.8, minWidth: '250px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Thousands of <span style={{background:'#fbbf24', color:'#1f2937', padding:'0.25rem 0.75rem', borderRadius:'0.5rem'}}>Courses</span></h3>
          <p style={{ marginTop:'0.5rem', color:'#e0e7ff' }}>Authored by industry experts</p>
        </div>
        <div style={{ flex: 0.6, display: 'flex', justifyContent: 'center', gap: '1.5rem', minWidth:'180px' }}>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontSize:'2.5rem', fontWeight:'900', color:'#fbbf24', margin:0 }}>45K+</p>
            <p style={{ fontSize:'0.75rem', color:'#c4b5fd', marginTop:'0.5rem' }}>Active Students</p>
          </div>
          <div style={{ width:'1px', height:'60px', background:'rgba(255,255,255,0.2)' }}></div>
          <div style={{ textAlign:'center' }}>
            <p style={{ fontSize:'2.5rem', fontWeight:'900', color:'#fbbf24', margin:0 }}>328+</p>
            <p style={{ fontSize:'0.75rem', color:'#c4b5fd', marginTop:'0.5rem' }}>Best Instructors</p>
          </div>
        </div>
      </div>
    </div>
  );
}

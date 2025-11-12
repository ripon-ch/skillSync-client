import { Facebook, Instagram, Youtube, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIconsBottom = [
    { icon: Facebook, color: '#3b5998', label: 'Facebook' },
    { icon: Instagram, color: '#E4405F', label: 'Instagram' },
    { icon: Youtube, color: '#FF0000', label: 'YouTube' },
    { icon: X, color: '#000000', label: 'X' },
  ];

  return (
    <footer style={{
      background: 'linear-gradient(to right, #220359, #7918F2, #4801FF)',
      color: '#ffffff',
      width: '100%'
    }}>
      {/* Top Section - 3 Columns */}
      <div style={{
        padding: '3rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.5fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column - Logo & Quote */}
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              marginBottom: '1rem',
              color: '#fcd34d'
            }}>
              SkillSync
            </h2>
            <blockquote style={{
              fontSize: '0.875rem',
              fontStyle: 'italic',
              lineHeight: '1.6',
              color: '#e9d5ff',
              borderLeft: '3px solid #fcd34d',
              paddingLeft: '1rem',
              margin: 0
            }}>
              "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime." - Malcolm X
            </blockquote>
          </div>

          {/* Center Column - Links */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#fcd34d',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                All Pages
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <Link to="/" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#fcd34d',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Courses & Policy
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Privacy Policy
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: '#e9d5ff', textDecoration: 'none', fontSize: '0.875rem' }}>
                    Terms & Condition
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Payment Methods Image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#fcd34d',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Payment Methods
            </h4>
            <div style={{
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.75rem',
              maxWidth: '100%',
              overflow: 'hidden'
            }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fe519eeddc08a495497d03f2f0e30f014%2F0d3858470c174df895a273120a492a70?format=webp&width=800"
                alt="Payment Methods"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '0.375rem'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Social Icons */}
      <div style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{
          fontSize: '0.875rem',
          color: '#6b7280',
          margin: 0
        }}>
          Copyright © {currentYear} @maxexemy.com
        </p>
        <div style={{
          display: 'flex',
          gap: '0.75rem'
        }}>
          {socialIconsBottom.map((social, idx) => {
            const IconComponent = social.icon;
            return (
              <a
                key={idx}
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: '0.25rem',
                  backgroundColor: social.color,
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={social.label}
              >
                <IconComponent size={14} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import LoggedInHome from './LoggedInHome';
import CourseCard from '../components/CourseCard';

export default function Index() {
  const { user } = useAuth();
  if (user) {
    return <LoggedInHome />;
  }
  return <LoggedOutHome />;
}

function LoggedOutHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(Array.isArray(data) && data.length ? data : []);
      } catch (_) {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    const handleChange = (e) => {
      setIsTabletOrSmaller(e.matches);
    };

    mql.addEventListener('change', handleChange);
    setIsTabletOrSmaller(mql.matches);

    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(to right, #220359, #4906BF)',
          minHeight: 'clamp(50vh, 100%, 70vh)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isTabletOrSmaller ? 'center' : 'space-between',
          padding: 'clamp(1rem, 5vw, 3.5rem) clamp(1rem, 5vw, 3rem)',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: isTabletOrSmaller ? 'column' : 'row'
        }}
        className="hero-responsive">
      {/* Left Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 'clamp(280px, 90vw, 550px)',
        zIndex: 10,
        order: isTabletOrSmaller ? 2 : 1
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 8vw, 3.5rem)',
          fontWeight: '900',
          color: '#ffffff',
          marginBottom: 'clamp(1rem, 5vw, 2.5rem)',
          lineHeight: '1.15',
          letterSpacing: '-0.02em'
        }}>
          Learning is{' '}
          <span style={{
            background: '#fbbf24',
            color: '#1f2937',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.5rem',
            fontWeight: '900',
            display: 'inline-block',
            transform: 'skewX(-10deg)',
            marginRight: '0.5rem'
          }}>
            What You
          </span>
          <br />
          Make of it. Make it Yours at SkillSync.
        </h1>

        <div style={{
          display: 'flex',
          gap: 'clamp(0.75rem, 3vw, 1.5rem)',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: '1rem'
        }}>
          <button style={{
            background: '#5E3FDE',
            color: '#ffffff',
            padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            fontWeight: '700',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 20px rgba(94, 63, 222, 0.3)',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 30px rgba(94, 63, 222, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 20px rgba(94, 63, 222, 0.3)';
          }}>
            Start Free Trial
            <ArrowRight size={20} />
          </button>

          <button style={{
            background: '#fbbf24',
            color: '#1f2937',
            width: 'clamp(48px, 10vw, 60px)',
            height: 'clamp(48px, 10vw, 60px)',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
            flexShrink: 0
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.3)';
          }}>
            <Play size={28} fill="#1f2937" />
          </button>

          <span style={{
            color: '#e0e7ff',
            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
            fontWeight: '500'
          }}>
            Watch Our Class Demo
          </span>
        </div>
      </div>

      {/* Right Section - Featured Course */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        minHeight: 'clamp(300px, 70vw, 550px)',
        flexDirection: 'column',
        gap: 'clamp(1rem, 3vw, 2rem)',
        order: isTabletOrSmaller ? 1 : 2
      }} className="featured-course-card">
        {/* Yellow decorative circles */}
        <div style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          background: '#fbbf24',
          borderRadius: '50%',
          top: '-80px',
          right: '60px',
          opacity: '0.4',
          filter: 'blur(20px)',
          zIndex: 1
        }}></div>

        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: '#fbbf24',
          borderRadius: '50%',
          bottom: '-150px',
          right: '-100px',
          opacity: '0.25',
          filter: 'blur(60px)',
          zIndex: 1
        }}></div>

        <div style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          background: '#4906BF',
          borderRadius: '50%',
          bottom: '80px',
          left: '-80px',
          opacity: '0.08',
          filter: 'blur(50px)',
          zIndex: 1
        }}></div>

        {/* Main course card */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '0 clamp(0.5rem, 3vw, 1rem)'
        }}>
          {/* Featured course card */}
          <div style={{
            background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
            borderRadius: '2rem',
            padding: 'clamp(1rem, 4vw, 2rem)',
            maxWidth: 'clamp(280px, 90vw, 420px)',
            height: 'auto',
            minHeight: 'clamp(250px, 60vw, 320px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Left content */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1rem',
              zIndex: 2,
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'center'
              }}>
                <div style={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '2px solid rgba(251, 191, 36, 0.3)',
                  color: '#fbbf24',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0.4rem'
                }}>
                  Pr
                </div>
                <div style={{
                  background: 'rgba(251, 191, 36, 0.1)',
                  border: '2px solid rgba(251, 191, 36, 0.3)',
                  color: '#fbbf24',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '0.4rem'
                }}>
                  Ae
                </div>
              </div>

              <h3 style={{
                fontSize: 'clamp(1.25rem, 4vw, 2.2rem)',
                fontWeight: '900',
                color: '#ffffff',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Video Editing
              </h3>
              <p style={{
                fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                color: '#e0e7ff',
                margin: '0.5rem 0 0 0',
                fontStyle: 'italic',
                fontWeight: '500'
              }}>
                & storytelling
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '0.5rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: '#ff4757',
                  borderRadius: '0.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6rem'
                }}>
                  ▶
                </div>
                <span style={{
                  fontSize: '0.85rem',
                  color: '#c4b5fd'
                }}>
                  by VOICE OF DHAKA
                </span>
              </div>
            </div>

            {/* Right image area - instructor photo */}
            <div style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginLeft: 'clamp(0, 2vw, 1rem)',
              zIndex: 2
            }}>
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=200&h=240&fit=crop"
                alt="Video Editing Instructor"
                style={{
                  width: 'clamp(120px, 25vw, 180px)',
                  height: 'clamp(150px, 30vw, 220px)',
                  borderRadius: '1rem',
                  objectFit: 'cover',
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=240&fit=crop';
                }}
              />
            </div>
          </div>

          {/* Info card - Top Right */}
          <div className="info-card-top" style={{
            position: 'absolute',
            top: 'clamp(10px, 3vw, 30px)',
            right: 'clamp(-80px, -5vw, -60px)',
            background: '#ffffff',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.75rem)',
            borderRadius: '1.2rem',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.7rem',
              color: '#9ca3af',
              margin: '0 0 0.3rem 0',
              fontWeight: '600'
            }}>
              Total Students
            </p>
            <p style={{
              fontSize: '1.8rem',
              fontWeight: '900',
              color: '#220359',
              margin: 0
            }}>
              15K
            </p>
          </div>

          {/* Info card - Bottom Left */}
          <div className="info-card-bottom" style={{
            position: 'absolute',
            bottom: 'clamp(10px, 3vw, 30px)',
            left: 'clamp(-100px, -5vw, -80px)',
            background: '#ffffff',
            padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.75rem)',
            borderRadius: '1.2rem',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.7rem',
              color: '#9ca3af',
              margin: '0 0 0.3rem 0',
              fontWeight: '600'
            }}>
              Enrolment
            </p>
            <p style={{
              fontSize: '1.8rem',
              fontWeight: '900',
              color: '#220359',
              margin: 0
            }}>
              36K+
            </p>
          </div>
        </div>

        {/* Course title below */}
        <h4 className="course-title" style={{
          fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
          fontWeight: '700',
          color: '#1f2937',
          margin: '0 0 1rem 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 5
        }}>
          Video Editing
        </h4>
      </div>
    </motion.div>


    {/* Partners/Logo Section */}
    <div style={{
      padding: 'clamp(1rem, 4vw, 2rem) clamp(1rem, 5vw, 3rem)',
      background: '#ffffff',
      width: '100%',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div className="partner-logos" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1.5rem, 5vw, 3rem)',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { text: 'Behance', color: '#0E76D6' },
          { text: 'AMZDJ', color: '#FF9900' },
          { text: 'Coursera', color: '#0056D2' },
          { text: 'Amazon', color: '#FF9900' },
          { text: 'Udacity', color: '#02B3E4' },
          { text: 'Cognitech', color: '#6C63FF' }
        ].map((partner, idx) => (
          <div key={idx} style={{
            fontSize: '0.9rem',
            fontWeight: '700',
            color: partner.color,
            opacity: 0.7,
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.opacity = '1'}
          onMouseOut={(e) => e.target.style.opacity = '0.7'}>
            {partner.text}
          </div>
        ))}
      </div>
    </div>

    {/* Achieve Your Goal Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          padding: 'clamp(2rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) clamp(2rem, 8vw, 4rem)',
          background: '#ffffff',
          width: '100%'
        }}>
        {/* Top label */}
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
          color: '#5E3FDE',
          fontWeight: '600',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Our Top Features
        </p>

        {/* Main heading */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
          fontWeight: '900',
          color: '#1f2937',
          margin: '0 0 1rem 0'
        }}>
          Achieve Your Goal With SkillSync
        </h2>

        {/* Subtitle */}
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(0.85rem, 3vw, 1rem)',
          color: '#6b7280',
          margin: '0 0 clamp(1.5rem, 5vw, 3rem) 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          When an unknown printer took a galley of type and scrambled maker specimen book has survived not only five centuries
        </p>

        {/* Feature cards row */}
        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(1rem, 4vw, 2rem)',
          marginBottom: 'clamp(2rem, 8vw, 4rem)',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {/* Card 1 - Expert Tutors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(34, 3, 89, 0.05), rgba(73, 6, 191, 0.05))',
              border: '2px solid rgba(94, 63, 222, 0.1)',
              borderRadius: '1.5rem',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.8rem'
            }}>
              👨‍🏫
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              Expert Tutors
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.6'
            }}>
              When An Unknown Printer Took A Galley Ofts Type And Scrambled Makes.
            </p>
          </motion.div>

          {/* Card 2 - Effective Courses */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(168, 85, 247, 0.05))',
            border: '2px solid rgba(168, 85, 247, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.8rem'
            }}>
              📚
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              Effective Courses
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.6'
            }}>
              When An Unknown Printer Took A Galley Ofts Type And Scrambled Makes.
            </p>
          </div>

          {/* Card 3 - Earn Certificate */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(217, 119, 6, 0.05))',
            border: '2px solid rgba(251, 191, 36, 0.1)',
            borderRadius: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '1.8rem'
            }}>
              🏆
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              Earn Certificate
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.6'
            }}>
              When An Unknown Printer Took A Galley Ofts Type And Scrambled Makes.
            </p>
          </div>
        </div>

        {/* Bottom section - Two columns */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '3rem',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          flexWrap: 'wrap'
        }}>
          {/* Left side - Circular image */}
          <div style={{
            flex: 1,
            minWidth: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Circular text background */}
            <div style={{
              position: 'relative',
              width: '280px',
              height: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Circle with SVG text path */}
              <svg
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
                viewBox="0 0 280 280"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 140, 140 m -110, 0 a 110,110 0 1,1 220,0 a 110,110 0 1,1 -220,0"
                    fill="none"
                  />
                </defs>
                <text
                  fontSize="12"
                  fill="#6b7280"
                  letterSpacing="2"
                  fontWeight="600"
                >
                  <textPath xlinkHref="#circlePath" startOffset="0%" textAnchor="start">
                    • EXCELLENT • SYSTEM • CAN • MAKE • CHANGE ���
                  </textPath>
                </text>
              </svg>

              {/* Center image */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                alt="Student"
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 10px 40px rgba(94, 63, 222, 0.15)',
                  position: 'relative',
                  zIndex: 2
                }}
              />

              {/* Yellow accent circle */}
              <div style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                background: '#fbbf24',
                borderRadius: '50%',
                top: '-20px',
                right: '-20px',
                opacity: '0.8',
                zIndex: 1
              }}></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div style={{
            flex: 1,
            minWidth: '300px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: '#1f2937',
              margin: '0 0 1rem 0',
              lineHeight: '1.2'
            }}>
              Join Our Free Workshops
            </h2>

            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: '0 0 2rem 0',
              lineHeight: '1.6'
            }}>
              Ethem an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            {/* Feature boxes - 2 columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: '#fbbf24',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1f2937',
                  fontWeight: '700',
                  fontSize: '0.8rem'
                }}>
                  ���
                </div>
                <span style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  fontWeight: '500'
                }}>
                  The Most World Class Instructors
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  📺
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    Smooth Virtual Live
                  </h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Classes
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #4ea8de, #5bb3e3)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 0.25rem 0'
                  }}>
                    99% Graduation
                  </h4>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    Complete
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button style={{
              background: 'linear-gradient(135deg, #5E3FDE, #7c3aed)',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              fontSize: '0.95rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(94, 63, 222, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(94, 63, 222, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(94, 63, 222, 0.3)';
            }}>
              Quick Join Now
              <span style={{
                fontSize: '1.2rem'
              }}>→</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Explore Best Courses Section */}
      <div style={{
        padding: 'clamp(2rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) clamp(2rem, 8vw, 4rem)',
        background: 'linear-gradient(to right, #220359, #4906BF)',
        width: '100%'
      }}>
        <p style={{
          textAlign: 'center',
          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
          color: '#c4b5fd',
          fontWeight: '600',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          Best Courses
        </p>

        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
          fontWeight: '900',
          color: '#ffffff',
          margin: '0 0 clamp(1.5rem, 5vw, 3rem) 0'
        }}>
          Explore Our World's Best Courses
        </h2>

        {/* Course cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" style={{
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 'clamp(1.5rem, 5vw, 3rem)'
        }}>
          {[
            { title: 'Learning JavaScript With Imagination', instructor: 'David Miller', category: 'Development', price: '$5.00', originalPrice: '$20.00', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop', rating: 4.5, reviews: 142, duration: '05', students: '70k', lessons: '22' },
            { title: 'The Complete Graphic Design for Beginners', instructor: 'Williams', category: 'Design', price: '$10.00', originalPrice: '$30.00', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop', rating: 4.8, reviews: 156, duration: '08', students: '70k', lessons: '202' },
            { title: 'Learning JavaScript With Imagination', instructor: 'Mortion', category: 'Data Science', price: '$20.00', originalPrice: '$50.00', image: 'https://images.unsplash.com/photo-1606857521884-51bab9c7dd21?w=300&h=200&fit=crop', rating: 4.7, reviews: 148, duration: '07', students: '10.2k', lessons: '68' },
            { title: 'Financial Analyst Training & Investing Course', instructor: 'Robert Fox', category: 'Business', price: '$15.00', originalPrice: '$40.00', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop', rating: 4.6, reviews: 134, duration: '06', students: '11k', lessons: '22' }
          ].map((course, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {/* Course Image */}
              <div style={{
                height: '160px',
                background: '#f3f4f6',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img src={course.image} alt={course.title} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'} />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: '#3b82f6',
                  color: '#ffffff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {course.category}
                </div>
              </div>

              {/* Card Content */}
              <div style={{
                padding: '1.25rem'
              }}>
                {/* Title */}
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 0.75rem 0',
                  lineHeight: '1.4',
                  minHeight: '2.4em'
                }}>
                  {course.title}
                </h4>

                {/* Instructor Info & Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.8rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#3b82f6',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      {course.instructor.charAt(0)}
                    </div>
                    <span style={{
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {course.instructor}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <span style={{color: '#f59e0b'}}>★</span>
                    <span style={{color: '#6b7280'}}>({course.reviews})</span>
                  </div>
                </div>

                {/* Price */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    textDecoration: 'line-through'
                  }}>
                    {course.originalPrice}
                  </span>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#3b82f6'
                  }}>
                    {course.price}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '0.75rem'
                }}>
                  <div>⏱ {course.duration}h</div>
                  <div>👥 {course.students}</div>
                  <div>📚 {course.lessons}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All button */}
        <div style={{
          textAlign: 'center'
        }}>
          <button style={{
            background: '#fbbf24',
            color: '#1f2937',
            padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
            fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            fontWeight: '700',
            border: 'none',
            borderRadius: '2rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 30px rgba(251, 191, 36, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            View All Courses
          </button>
        </div>
      </div>

      {/* Free Workshops Section */}
      <div style={{
        padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 5vw, 2rem)',
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(1.5rem, 5vw, 3rem)',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto',
          flexWrap: 'wrap'
        }}>
          {/* Left - Image */}
          <div style={{
            flex: 1,
            minWidth: 'clamp(280px, 100%, 300px)',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop"
              alt="Workshop"
              style={{
                maxWidth: '100%',
                borderRadius: '1rem',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>

          {/* Right - Content */}
          <div style={{
            flex: 1,
            minWidth: 'clamp(280px, 100%, 300px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: '900',
              color: '#1f2937',
              margin: '0 0 clamp(1rem, 3vw, 1.5rem) 0'
            }}>
              Join Our Free Workshops
            </h2>

            <p style={{
              fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)',
              color: '#6b7280',
              margin: '0 0 clamp(1rem, 3vw, 2rem) 0',
              lineHeight: '1.6'
            }}>
              Get hands-on experience and learn from industry experts in our weekly free workshops.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.75rem, 2vw, 1rem)',
              marginBottom: 'clamp(1rem, 3vw, 2rem)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1rem)'
              }}>
                <div style={{
                  width: 'clamp(28px, 5vw, 32px)',
                  height: 'clamp(28px, 5vw, 32px)',
                  background: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}>
                  ●
                </div>
                <span style={{
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  color: '#4b5563',
                  fontWeight: '500'
                }}>
                  Expert-led training sessions
                </span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.75rem, 2vw, 1rem)'
              }}>
                <div style={{
                  width: 'clamp(28px, 5vw, 32px)',
                  height: 'clamp(28px, 5vw, 32px)',
                  background: '#06b6d4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  flexShrink: 0
                }}>
                  ●
                </div>
                <span style={{
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  color: '#4b5563',
                  fontWeight: '500'
                }}>
                  100% interactive workshops
                </span>
              </div>
            </div>

            <button style={{
              background: '#5E3FDE',
              color: '#ffffff',
              padding: 'clamp(0.6rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              fontWeight: '700',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(94, 63, 222, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 30px rgba(94, 63, 222, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(94, 63, 222, 0.3)';
            }}>
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        padding: 'clamp(1rem, 3vw, 2rem)',
        marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
      }}>
        <div className="stats-container" style={{
          padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 5vw, 2rem)',
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(1rem, 3vw, 2rem)',
          flexWrap: 'wrap',
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '2rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
        }}>
        {/* Left - Title */}
        <div style={{
          flex: 0.8,
          minWidth: 'clamp(250px, 100%, 280px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
            fontWeight: '900',
            color: '#ffffff',
            margin: 0,
            lineHeight: '1.3'
          }}>
            Thousands of <span style={{background: '#fbbf24', color: '#1f2937', padding: '0.25rem 0.75rem', borderRadius: '0.5rem'}}>Courses</span>
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#e0e7ff',
            margin: '0.75rem 0 0 0'
          }}>
            Authored by industry experts
          </p>
        </div>

        {/* Center - Stats */}
        <div style={{
          flex: 0.6,
          minWidth: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem'
        }}>
          <div style={{
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#fbbf24',
              margin: 0
            }}>
              45K+
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#c4b5fd',
              margin: '0.5rem 0 0 0'
            }}>
              Active Students
            </p>
          </div>

          <div style={{
            width: '1px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.2)'
          }}></div>

          <div style={{
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#fbbf24',
              margin: 0
            }}>
              328+
            </p>
            <p style={{
              fontSize: '0.75rem',
              color: '#c4b5fd',
              margin: '0.5rem 0 0 0'
            }}>
              Best Instructors
            </p>
          </div>
        </div>

        {/* Instructor images on right */}
        <div style={{
          flex: 0.7,
          minWidth: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '-30px',
          position: 'relative'
        }}>
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
            alt="Instructor 1"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              objectFit: 'cover',
              position: 'relative',
              zIndex: 2
            }}
          />
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
            alt="Instructor 2"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              objectFit: 'cover',
              marginLeft: '-40px',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>
      </div>
      </div>

      {/* Instructors Section */}
      <div style={{
        padding: '5rem 2rem 4rem',
        background: 'linear-gradient(to right, #220359, #4906BF)',
        width: '100%'
      }}>
        {/* Badge and heading */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            Select Instructor
          </div>

          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#ffffff',
            margin: 0,
            lineHeight: '1.3'
          }}>
            Our Top Class & Professional<br />Instructors in One Place
          </h2>
        </div>

        {/* Featured instructor - 2 column layout */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '4rem',
          flexWrap: 'wrap'
        }}>
          {/* Left - Large instructor image with yellow background */}
          <div style={{
            flex: 0.5,
            minWidth: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '280px',
              height: '280px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
                alt="Olivia Mia"
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '3rem',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Right - Instructor info */}
          <div style={{
            flex: 0.5,
            minWidth: '280px'
          }}>
            {/* Rating badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(251, 191, 36, 0.2)',
              color: '#fbbf24',
              padding: '0.5rem 1rem',
              borderRadius: '1.5rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              border: '1px solid rgba(251, 191, 36, 0.4)'
            }}>
              <span>★★★★★</span>
              <span>4.8 Rating</span>
            </div>

            {/* Instructor name and title */}
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '900',
              color: '#ffffff',
              margin: '0 0 0.5rem 0'
            }}>
              Olivia Mia
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#c4b5fd',
              fontWeight: '600',
              margin: '0 0 1rem 0'
            }}>
              Web Design
            </p>

            {/* Description */}
            <p style={{
              fontSize: '0.9rem',
              color: '#e0e7ff',
              lineHeight: '1.6',
              margin: '0 0 2rem 0'
            }}>
              Helping the standard chunk of Lorem Ipsum is not simply text that appears simple
            </p>

            {/* Social icons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '1.2rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(251, 191, 36, 0.3)';
                    e.currentTarget.style.borderColor = '#fbbf24';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  f
                </a>
              ))}
            </div>

            {/* Join My Class button */}
            <button style={{
              background: '#5E3FDE',
              color: '#ffffff',
              padding: '0.75rem 2rem',
              fontSize: '0.95rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(94, 63, 222, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Join My Class →
            </button>
          </div>
        </div>

        {/* Instructors carousel */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '3rem',
          overflowX: 'auto',
          flexWrap: 'wrap'
        }}>
          {/* Yellow circle decoration left */}
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#fbbf24',
            flexShrink: 0
          }}></div>

          {/* Instructor avatars */}
          {[
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1502685122556-7a2e3a8db57a?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=80&h=80&fit=crop',
            'https://images.unsplash.com/photo-1500999995432-eaf531bde0e2?w=80&h=80&fit=crop'
          ].map((imgUrl, i) => (
            <img
              key={i}
              src={imgUrl}
              alt={`Instructor ${i + 1}`}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                border: '3px solid #ffffff',
                objectFit: 'cover',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
          ))}

          {/* Yellow circle decoration right */}
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#fbbf24',
            flexShrink: 0
          }}></div>
        </div>
      </div>

      {/* Gap between sections */}
      <div style={{
        height: '4rem',
        background: '#ffffff'
      }}></div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '80px',
          height: '80px',
          background: 'rgba(251, 191, 36, 0.2)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '100px',
          width: '120px',
          height: '120px',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          width: '60px',
          height: '60px',
          background: 'rgba(251, 191, 36, 0.15)',
          borderRadius: '50%'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left - Character illustration */}
          <div style={{
            flex: '0 0 280px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '220px',
              height: '220px',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(251, 191, 36, 0.3)'
            }}>
              {/* Simple character representation */}
              <div style={{
                color: '#1f2937',
                fontSize: '4rem',
                fontWeight: 'bold'
              }}>👨‍💻</div>
              {/* Dotted decoration */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '40px',
                height: '40px',
                background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="5" cy="5" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="15" cy="5" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="25" cy="5" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="35" cy="5" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="5" cy="15" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="15" cy="15" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="25" cy="15" r="2" fill="%23ffffff" opacity="0.6"/%3E%3Ccircle cx="35" cy="15" r="2" fill="%23ffffff" opacity="0.6"/%3E%3C/svg%3E")',
                backgroundSize: 'contain'
              }}></div>
            </div>
          </div>

          {/* Right - Content */}
          <div style={{
            flex: 1,
            maxWidth: '500px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              color: '#ffffff',
              margin: '0 0 1rem 0',
              lineHeight: '1.2'
            }}>
              Want To Stay <span style={{color: '#fbbf24'}}>Informed</span> About
              <br />New <span style={{color: '#fbbf24'}}>Courses & Study?</span>
            </h2>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '2rem'
            }}>
              <input
                type="email"
                placeholder="Type Your E-Mail"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#1f2937'
                }}
              />
              <button style={{
                background: '#fbbf24',
                color: '#1f2937',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: '700',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.4)';
              }}>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div style={{
        padding: '4rem 2rem',
        background: '#f8fafc'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Upcoming Events Label */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <span style={{
              color: '#6d28d9',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Upcoming Events
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '4rem',
            flexWrap: 'wrap'
          }}>
            {/* Left - Content */}
            <div style={{
              flex: 1,
              minWidth: '320px'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                color: '#1f2937',
                margin: '0 0 1.5rem 0',
                lineHeight: '1.2'
              }}>
                Join Our Community And Make It Bigger
              </h2>

              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                margin: '0 0 2.5rem 0',
                lineHeight: '1.7',
                maxWidth: '400px'
              }}>
                When an unknown printer took a galley of type and scrambled maker a specimen book has survived not only five centuries
              </p>

              <button style={{
                background: '#6d28d9',
                color: '#ffffff',
                padding: '0.75rem 2rem',
                fontSize: '0.9rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#5b21b6';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#6d28d9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                See All Events
                <span style={{fontSize: '1.1rem'}}>→</span>
              </button>
            </div>

            {/* Right - Event Cards */}
            <div style={{
              flex: 1,
              minWidth: '320px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                {
                  date: '25 June, 2024',
                  title: 'The Accessible Target Sizes Cheatsheet',
                  location: 'United Kingdom',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=280&h=180&fit=crop'
                },
                {
                  date: '23 June, 2024',
                  title: 'Exactly How Technology Can Make Reading',
                  location: 'Tokyo Japan',
                  image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=280&h=180&fit=crop'
                },
                {
                  date: '22 June, 2024',
                  title: 'Aewe Creating Futures Through Technology',
                  location: 'New York',
                  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=280&h=180&fit=crop'
                }
              ].map((event, i) => (
                <div
                  key={i}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{
                    position: 'relative',
                    height: '120px'
                  }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&h=180&fit=crop';
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#fbbf24',
                      color: '#1f2937',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {event.date}
                    </div>
                  </div>
                  <div style={{
                    padding: '1.25rem'
                  }}>
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      margin: '0 0 0.75rem 0',
                      lineHeight: '1.4'
                    }}>
                      {event.title}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#6b7280',
                      margin: 0
                    }}>
                      📍 {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* News Feed Section */}
      <div style={{
        padding: '5rem 2rem 4rem',
        background: 'linear-gradient(to right, #220359, #4906BF)',
        width: '100%'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: '900',
          color: '#ffffff',
          margin: '0 0 3rem 0'
        }}>
          Our Latest News Feed
        </h2>

        {/* News cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {[
            'New course on Advanced React Patterns',
            'Expert interview: Building successful startups',
            'Student success stories: From zero to hero',
            'Platform updates and new features'
          ].map((title, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <img
                src={`https://images.unsplash.com/photo-150700${100 + idx}?w=300&h=200&fit=crop`}
                alt={title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                padding: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0 0 1rem 0'
                }}>
                  {title}
                </h4>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Read the latest updates from our blog
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become Instructor/Student Section */}
      <div style={{
        padding: '4rem 2rem',
        background: '#ffffff',
        width: '100%',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {/* Become Instructor */}
          <div style={{
            textAlign: 'center'
          }}>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Become Instructor"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '1rem',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              Become a Instructor
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: '0 0 1.5rem 0'
            }}>
              Share your knowledge and teach millions of learners worldwide
            </p>
            <button style={{
              background: '#5E3FDE',
              color: '#ffffff',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}>
              Get Started
            </button>
          </div>

          {/* Become Student */}
          <div style={{
            textAlign: 'center'
          }}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
              alt="Become Student"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '1rem',
                objectFit: 'cover',
                marginBottom: '1.5rem'
              }}
            />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              Become a Student
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#6b7280',
              margin: '0 0 1.5rem 0'
            }}>
              Start learning from the best courses and instructors in the world
            </p>
            <button style={{
              background: '#fbbf24',
              color: '#1f2937',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '700',
              border: 'none',
              borderRadius: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}>
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hero-responsive {
          flex-direction: row !important;
        }

        @media (max-width: 1024px) {
          .hero-responsive {
            flex-direction: column !important;
            min-height: auto !important;
            padding: 2.5rem 2rem !important;
          }
          div[style*="flex: 1"] {
            flex: none !important;
            width: 100% !important;
          }
          div[style*="gridTemplateColumns: 'repeat(auto-fit'"] {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .hero-responsive {
            flex-direction: column !important;
            min-height: auto !important;
            padding: 2rem 1.5rem !important;
          }
          div[style*="flex: 1; display: flex; flex-direction: column"] {
            flex: none !important;
            width: 100% !important;
          }
          div[style*="space-between"] {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          div[style*="space-between"][style*="gap: '3rem'"] {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          h1[style*="3.5rem"] {
            font-size: 2rem !important;
            margin-bottom: 1.5rem !important;
          }
          h2[style*="2.5rem"] {
            font-size: 1.75rem !important;
          }
          h3[style*="2rem"] {
            font-size: 1.5rem !important;
          }
          div[style*="gap: '1.5rem'"] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          div[style*="padding: '4rem 2rem'"] {
            padding: 2.5rem 1.5rem !important;
          }
          div[style*="padding: '3rem 2rem'"] {
            padding: 2rem 1.5rem !important;
          }
          div[style*="minHeight: '550px'"] {
            min-height: auto !important;
          }
        }
        @media (max-width: 640px) {
          .hero-responsive {
            min-height: auto !important;
            padding: 1.5rem 1rem !important;
          }
          h1[style*="3.5rem"] {
            font-size: 1.75rem !important;
            margin-bottom: 1rem !important;
          }
          h2[style*="2.5rem"] {
            font-size: 1.5rem !important;
          }
          h3[style*="1.75rem"] {
            font-size: 1.25rem !important;
          }
        }
        @media (max-width: 480px) {
          h1[style*="3.5rem"] {
            font-size: 1.5rem !important;
            margin-bottom: 0.75rem !important;
          }
          h2[style*="2.5rem"] {
            font-size: 1.25rem !important;
          }
          div[style*="gridTemplateColumns: 'repeat(auto-fit'"] {
            grid-template-columns: 1fr !important;
          }
          button {
            width: 100% !important;
            padding: 0.75rem 1.5rem !important;
            font-size: 0.875rem !important;
          }
          div[style*="padding: '4rem 2rem'"] {
            padding: 1.5rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const COURSE_SECTIONS = [
  {
    id: 'active',
    title: 'Active Courses',
    courses: [
      {
        id: 'active-web-design',
        title: 'Web Design',
        subtitle: 'WordPress Web Design & Ecommerce',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=700&h=500&fit=crop',
        overlay: ['#7c3aed', '#4338ca'],
        href: '/course/web-design',
      },
      {
        id: 'active-video-editing',
        title: 'Video Editing',
        subtitle: 'Video Editing & Storytelling',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=700&h=500&fit=crop',
        overlay: ['#312e81', '#1e1b4b'],
        href: '/course/video-editing',
      },
      {
        id: 'active-graphic-design',
        title: 'Graphic Designing',
        subtitle: 'Graphic Design with Canva',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop',
        overlay: ['#2563eb', '#1d4ed8'],
        href: '/course/graphic-designing',
      },
      {
        id: 'active-affiliate-marketing',
        title: 'Affiliate Marketing',
        subtitle: 'Affiliate Marketing Fundamentals',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=700&h=500&fit=crop',
        overlay: ['#0f766e', '#047857'],
        href: '/course/affiliate-marketing',
      },
    ],
  },
  {
    id: 'design-dev',
    title: 'Design and development',
    courses: [
      {
        id: 'design-web-design',
        title: 'Web Design',
        subtitle: 'WordPress Web Design & Ecommerce',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=700&h=500&fit=crop',
        overlay: ['#6366f1', '#4338ca'],
        href: '/course/web-design',
      },
      {
        id: 'design-uiux',
        title: 'UI/UX Design',
        subtitle: 'Professional UI/UX Design',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=500&fit=crop',
        overlay: ['#ec4899', '#db2777'],
      },
      {
        id: 'design-shopify',
        title: 'Shopify Ecommerce',
        subtitle: 'Shopify Ecommerce Launchpad',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=700&h=500&fit=crop',
        overlay: ['#22d3ee', '#0ea5e9'],
      },
      {
        id: 'design-wordpress-divi',
        title: 'WordPress & DIVI',
        subtitle: 'WordPress & Divi Masterclass',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=700&h=500&fit=crop',
        overlay: ['#4c1d95', '#312e81'],
      },
    ],
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    courses: [
      {
        id: 'marketplace-fiverr',
        title: 'Fiverr Marketplace',
        subtitle: 'Fiverr Marketplace Mastery',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=700&h=500&fit=crop',
        overlay: ['#0ea5e9', '#0369a1'],
        href: '/course/fiverr-marketplace',
      },
      {
        id: 'marketplace-upwork',
        title: 'Upwork Marketplace',
        subtitle: 'Upwork A to Z',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=700&h=500&fit=crop',
        overlay: ['#34d399', '#059669'],
        href: '/course/upwork-marketplace',
      },
    ],
  },
  {
    id: 'editing-design',
    title: 'Editing & Design',
    courses: [
      {
        id: 'editing-graphic-design',
        title: 'Graphic Design',
        subtitle: 'Graphic Design with Cean',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1527192491265-7e15c0556970?w=700&h=500&fit=crop',
        overlay: ['#8b5cf6', '#7c3aed'],
        href: '/course/graphic-design',
      },
      {
        id: 'editing-digital-art',
        title: 'Digital Art & Illustration',
        subtitle: 'Digital Art & Illustration',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=700&h=500&fit=crop',
        overlay: ['#f59e0b', '#d97706'],
      },
      {
        id: 'editing-3d-animation',
        title: '3D Animation',
        subtitle: '3D Animation Essentials',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1528855275995-9bb942b0eeae?w=700&h=500&fit=crop',
        overlay: ['#f97316', '#dc2626'],
      },
      {
        id: 'editing-video-editing',
        title: 'Video Editing',
        subtitle: 'Video Editing & Storytelling',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=700&h=500&fit=crop',
        overlay: ['#2563eb', '#1d4ed8'],
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    courses: [
      {
        id: 'digital-facebook',
        title: 'Facebook Marketing',
        subtitle: 'Facebook Marketing',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=500&fit=crop',
        overlay: ['#2563eb', '#1d4ed8'],
      },
      {
        id: 'digital-seo',
        title: 'SEO',
        subtitle: 'SEO Masterclass',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop',
        overlay: ['#22c55e', '#16a34a'],
      },
      {
        id: 'digital-email',
        title: 'E-Mail Marketing',
        subtitle: 'Email Marketing Automation',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=700&h=500&fit=crop',
        overlay: ['#facc15', '#eab308'],
      },
      {
        id: 'digital-google',
        title: 'Google Ads',
        subtitle: 'Google Ads Strategy',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=500&fit=crop',
        overlay: ['#fb7185', '#f43f5e'],
      },
    ],
  },
  {
    id: 'creative',
    title: 'Creative & Passion',
    courses: [
      {
        id: 'creative-photography',
        title: 'Photography',
        subtitle: 'Photography & Lighting',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=700&h=500&fit=crop',
        overlay: ['#0f172a', '#1e293b'],
      },
      {
        id: 'creative-drawing',
        title: 'Drawing & Art',
        subtitle: 'Drawing & Art Fundamentals',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&h=500&fit=crop',
        overlay: ['#ec4899', '#c026d3'],
      },
      {
        id: 'creative-content',
        title: 'Content Creation',
        subtitle: 'Content Creation Mastery',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=700&h=500&fit=crop',
        overlay: ['#6366f1', '#312e81'],
      },
      {
        id: 'creative-ethical-hacking',
        title: 'Ethical Hacking',
        subtitle: 'Ethical Hacking Essentials',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&h=500&fit=crop',
        overlay: ['#111827', '#1f2937'],
      },
    ],
  },
  {
    id: 'free-courses',
    title: 'Free Courses',
    courses: [
      {
        id: 'free-graphic-design',
        title: 'Graphic Design',
        subtitle: 'Graphic Design Basics',
        statusLabel: 'Enroll now',
        statusVariant: 'active',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=700&h=500&fit=crop',
        overlay: ['#6366f1', '#4338ca'],
        href: '/course/free-graphic-design',
      },
      {
        id: 'free-microsoft-office',
        title: 'Microsoft Office',
        subtitle: 'Microsoft Office Essentials',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=700&h=500&fit=crop',
        overlay: ['#22d3ee', '#0284c7'],
      },
      {
        id: 'free-quran',
        title: 'Quran Shikkha',
        subtitle: 'Quran Shikkha Course',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=700&h=500&fit=crop',
        overlay: ['#16a34a', '#14532d'],
      },
      {
        id: 'free-chatgpt',
        title: 'ChatGPT Crash Course',
        subtitle: 'ChatGPT Crash Course',
        statusLabel: 'Coming soon',
        statusVariant: 'soon',
        image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=700&h=500&fit=crop',
        overlay: ['#0ea5e9', '#312e81'],
      },
    ],
  },
];

function StatusBadge({ label = '', variant = 'soon' }) {
  const isActive = variant === 'active';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.78rem',
        fontWeight: 600,
        padding: '0.4rem 1.2rem',
        borderRadius: '9999px',
        background: isActive
          ? 'linear-gradient(135deg, #4c1d95, #6d28d9)'
          : 'rgba(148, 163, 184, 0.18)',
        color: isActive ? '#ffffff' : '#1f2937',
        boxShadow: isActive ? '0 10px 20px rgba(76, 29, 149, 0.3)' : 'none',
        textTransform: 'capitalize',
        border: isActive ? 'none' : '1px solid rgba(148, 163, 184, 0.35)',
      }}
    >
      {label}
    </span>
  );
}

function CourseCard({ course }) {
  const navigate = useNavigate();
  const [startColor, endColor] = course.overlay ?? ['#312e81', '#1e1b4b'];
  const handleNavigate = () => {
    if (course.href) {
      navigate(course.href);
    }
  };
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '28px',
        boxShadow: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: course.href ? 'pointer' : 'default',
        transition: 'transform 0.25s ease',
        width: '100%',
        height: '320px',
        justifySelf: 'stretch'
      }}
      onClick={handleNavigate}
      onMouseOver={(e) => {
        if (course.href) {
          e.currentTarget.style.transform = 'translateY(-6px)';
        }
      }}
      onMouseOut={(e) => {
        if (course.href) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '200px',
          background: `linear-gradient(140deg, ${startColor}, ${endColor})`,
          flexShrink: 0
        }}
      >
        <img
          src={course.image}
          alt={course.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'multiply',
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=500&fit=crop';
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, rgba(15, 23, 42, 0) 10%, rgba(15, 23, 42, 0.55) 100%)',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            color: '#ffffff',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              backdropFilter: 'blur(2px)',
            }}
          >
            {course.subtitle}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            color: '#ffffff',
          }}
        >
          <h3
            style={{
              marginTop: 0,
              fontSize: '1.35rem',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {course.title}
          </h3>
        </div>
      </div>
      <div
        style={{
          padding: '1.1rem 1.4rem 1.4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          minHeight: '120px',
          flexGrow: 1
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            style={{
              border: 'none',
              background: course.statusVariant === 'active'
                ? 'linear-gradient(135deg, #4c1d95, #6d28d9)'
                : '#e2e8f0',
              color: course.statusVariant === 'active' ? '#ffffff' : '#475569',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: course.statusVariant === 'active' && course.href ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '9999px',
              boxShadow: course.statusVariant === 'active' ? '0 12px 24px rgba(76, 29, 149, 0.35)' : 'none',
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (!(course.statusVariant === 'active' && course.href)) return;
              handleNavigate();
            }}
          >
            {course.statusLabel}
            <span
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '9999px',
                background: course.statusVariant === 'active' ? '#ffffff' : '#cbd5e1',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ArrowRight size={13} color={course.statusVariant === 'active' ? '#4c1d95' : '#475569'} />
            </span>
          </button>
          <button
            type="button"
            style={{
              border: 'none',
              background: 'transparent',
              color: '#4c1d95',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: course.href ? 'pointer' : 'not-allowed',
              fontSize: '0.9rem',
              padding: '0.45rem 0.6rem',
            }}
            onClick={(event) => {
              event.stopPropagation();
              if (!course.href) return;
              handleNavigate();
            }}
          >
            View details
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CourseSection({ section }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
      style={{ marginBottom: '3.5rem' }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          gap: '1rem',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.25rem, 5vw, 1.8rem)',
            fontWeight: 600,
            color: '#1f2937',
          }}
        >
          {section.title}
        </h2>
      </motion.div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          justifyContent: 'flex-start'
        }}
      >
        {section.courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function LoggedInHome() {
  const [isTabletOrSmaller, setIsTabletOrSmaller] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => {
      setIsTabletOrSmaller(e.matches);
    };

    mql.addEventListener('change', handleChange);
    setIsTabletOrSmaller(mql.matches);

    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div style={{ background: '#f1f5f9', minHeight: '100vh' }}>
      {/* Hero (same home) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(to right, #220359, #4906BF)',
          minHeight: 'auto',
          display: 'flex',
          alignItems: isTabletOrSmaller ? 'center' : 'center',
          justifyContent: isTabletOrSmaller ? 'center' : 'space-between',
          padding: 'clamp(1rem, 5vw, 2rem) clamp(1rem, 5vw, 1.5rem)',
          position: 'relative',
          overflow: 'hidden',
          flexDirection: isTabletOrSmaller ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: 'clamp(1rem, 3vw, 1.5rem)'
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
              width: isTabletOrSmaller ? '48px' : 'clamp(48px, 10vw, 60px)',
              height: isTabletOrSmaller ? '48px' : 'clamp(48px, 10vw, 60px)',
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
              <Play size={isTabletOrSmaller ? 20 : 28} fill="#1f2937" />
            </button>

            <span style={{
              color: '#e0e7ff',
              fontSize: isTabletOrSmaller ? '0.8rem' : 'clamp(0.8rem, 2.5vw, 1rem)',
              fontWeight: '500',
              whiteSpace: isTabletOrSmaller ? 'nowrap' : 'normal'
            }}>
              Watch Our Class Demo
            </span>
          </div>
        </div>

        {/* Right Section - Featured Course (same visual) */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '0',
          flexDirection: 'column',
          gap: 'clamp(1rem, 3vw, 2rem)',
          order: isTabletOrSmaller ? 1 : 2
      }}>
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

          <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
              borderRadius: '2rem',
              overflow: 'hidden',
              width: '360px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
            }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fe519eeddc08a495497d03f2f0e30f014%2F2fb8309e35b84a78bc3ad9a647b6a9cf?format=webp&width=800"
                alt="Featured course"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ background: '#ffffff', padding: '1rem 1.25rem', textAlign: 'center' }}>
                <strong style={{ color: '#1f2937' }}>Video Editing</strong>
              </div>
            </div>
          </div>
      </div>
    </motion.div>


      {/* Course Sections */}
      <section style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem) clamp(1rem, 3vw, 2rem)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {COURSE_SECTIONS.map((section) => (
            <div key={section.id}>
              <CourseSection section={section} />
              {section.id === 'editing-design' && (
                <section
                  style={{
                    padding: 'clamp(2rem, 6vw, 4.5rem) clamp(1rem, 5vw, 2rem)',
                    background: 'linear-gradient(135deg, #1f0a5c, #4c1d95)',
                    width: '100vw',
                    marginLeft: 'calc(50% - 50vw)',
                    marginRight: 'calc(50% - 50vw)',
                    marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 'clamp(1.5rem, 5vw, 3rem)',
                      flexWrap: 'wrap',
                      color: '#ffffff',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 'clamp(250px, 90vw, 280px)' }}>
                      <h2
                        style={{
                          fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                          fontWeight: 900,
                          lineHeight: 1.2,
                          marginBottom: 'clamp(0.75rem, 3vw, 1.25rem)',
                        }}
                      >
                        Incompetent youth society,
                        <br />
                        Skillfully raised,
                        <br />
                        Our new Pathway
                      </h2>
                      <p style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', opacity: 0.85, lineHeight: 1.7 }}>
                        We empower learners with modern skills, real projects, and mentorship to build meaningful careers in the digital economy.
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        minWidth: 'clamp(250px, 90vw, 280px)',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: 'clamp(1rem, 4vw, 2rem)',
                        position: 'relative',
                        boxShadow: '0 25px 45px rgba(15, 23, 42, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=400&fit=crop"
                        alt="Learner"
                        style={{
                          width: 'clamp(140px, 30vw, 220px)',
                          height: 'clamp(140px, 30vw, 220px)',
                          borderRadius: '9999px',
                          objectFit: 'cover',
                          border: '6px solid rgba(255,255,255,0.9)',
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
                        }}
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)', background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: 900,
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Why Choose SkillSync?
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Empowering learners worldwide with expert-led courses, hands-on projects, and industry-recognized certifications.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2rem)',
            maxWidth: '1200px'
          }}>
            {[
              {
                icon: '🎓',
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with years of real-world experience and proven track records.'
              },
              {
                icon: '💻',
                title: 'Hands-On Projects',
                description: 'Build real projects that matter. Apply concepts immediately with practical, industry-relevant assignments.'
              },
              {
                icon: '🏆',
                title: 'Recognized Certificates',
                description: 'Earn certificates that boost your resume and demonstrate your competence to employers worldwide.'
              },
              {
                icon: '🌍',
                title: 'Global Community',
                description: 'Connect with thousands of learners, collaborate, share ideas, and grow together in our community.'
              },
              {
                icon: '⏱️',
                title: 'Learn at Your Pace',
                description: 'Flexible learning schedule. Access course materials anytime, anywhere, on any device.'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Get help when you need it. Our support team is always ready to answer your questions.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                style={{
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '1rem',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(94, 63, 222, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.75rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#6b7280',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: 900,
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Meet Our Top Instructors
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Learn from the best in the industry. Our instructors are passionate educators and experts in their fields.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1.5rem, 4vw, 2rem)',
            maxWidth: '1200px'
          }}>
            {[
              {
                name: 'Sarah Johnson',
                specialty: 'Web Development',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                students: '15,000+',
                rating: 4.9
              },
              {
                name: 'Mike Chen',
                specialty: 'UI/UX Design',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                students: '12,500+',
                rating: 4.8
              },
              {
                name: 'Emma Wilson',
                specialty: 'Digital Marketing',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                students: '18,000+',
                rating: 4.9
              },
              {
                name: 'David Kumar',
                specialty: 'Data Science',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
                students: '14,200+',
                rating: 4.7
              },
              {
                name: 'Lisa Anderson',
                specialty: 'Video Production',
                image: 'https://images.unsplash.com/photo-1507527173827-ae90b3639c27?w=400&h=400&fit=crop',
                students: '10,800+',
                rating: 4.9
              },
              {
                name: 'James Wilson',
                specialty: 'Business Strategy',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
                students: '16,500+',
                rating: 4.8
              }
            ].map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                style={{
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  borderRadius: '1.25rem',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(94, 63, 222, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  style={{
                    width: 'clamp(100px, 20vw, 120px)',
                    height: 'clamp(100px, 20vw, 120px)',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '1rem',
                    border: '4px solid #f0f0f0'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/120?text=' + instructor.name.split(' ')[0];
                  }}
                />
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: 700,
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {instructor.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#5E3FDE',
                  fontWeight: 600,
                  marginBottom: '0.75rem'
                }}>
                  {instructor.specialty}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>
                  <span>⭐ {instructor.rating}</span>
                  <span>👥 {instructor.students}</span>
                </div>
                <button style={{
                  width: '100%',
                  padding: '0.6rem 1rem',
                  background: '#5E3FDE',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#4a2fa8';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#5E3FDE';
                  e.target.style.transform = 'scale(1)';
                }}>
                  View Profile
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section style={{ padding: '3.5rem 2rem 5rem', background: '#f1f5f9' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#1f2937',
          }}
        >
          <p style={{ fontSize: '1rem', color: '#475569', marginBottom: '2rem' }}>
            All of our courses are currently under review for recording, and they will soon be published on our platform one by one. Stay connected with us by following our Facebook and YouTube channels.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <div
              style={{
                background: '#2563eb',
                color: '#ffffff',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 600,
              }}
            >
              Facebook
            </div>
            <div
              style={{
                background: '#ef4444',
                color: '#ffffff',
                padding: '0.65rem 1.5rem',
                borderRadius: '9999px',
                fontWeight: 600,
              }}
            >
              YouTube
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

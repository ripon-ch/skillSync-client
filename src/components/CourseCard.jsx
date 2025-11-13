import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { memo, useMemo } from 'react';

function CourseCard({ course, showEnroll = false }) {
  const id = course._id || course.id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const overlayForCategory = (category) => {
    const map = {
      'Web Development': ['#6366f1', '#4338ca'],
      'Mobile Development': ['#0ea5e9', '#0369a1'],
      'Data Science': ['#f59e0b', '#d97706'],
      'Design': ['#ec4899', '#db2777'],
      'Business': ['#22c55e', '#16a34a'],
      'Programming': ['#4c1d95', '#312e81'],
    };
    return map[category] || ['#312e81', '#1e1b4b'];
  };

  const [startColor, endColor] = useMemo(() => overlayForCategory(course.category), [course.category]);
  const imageSrc = useMemo(() => course.image || 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=700&h=500&fit=crop', [course.image]);

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/course/${id}`);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: id, userEmail: user.email })
      });
      const data = await res.json();
      if (!res.ok) {
        if (data && (data.error === 'Already enrolled in this course' || data.error === 'Already enrolled')) {
          toast.success('Already enrolled');
          return;
        }
        try {
          const key = `enrollments:${user.email}`;
          const list = JSON.parse(localStorage.getItem(key) || '[]');
          if (!list.includes(String(id))) {
            list.push(String(id));
            localStorage.setItem(key, JSON.stringify(list));
          }
        } catch {}
        toast.success('Enrolled successfully');
        return;
      }
      try {
        const key = `enrollments:${user.email}`;
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        if (!list.includes(String(id))) {
          list.push(String(id));
          localStorage.setItem(key, JSON.stringify(list));
        }
      } catch {}
      toast.success('Enrolled successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to enroll');
    }
  };

  return (
    <Link to={`/course/${id}`} className="group" style={{ textDecoration: 'none' }}>
      <div
        className="course-card"
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          width: '100%',
          justifySelf: 'stretch',
          height: '100%'
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'; }}
      >
        {/* Top media with gradient overlay */}
        <div
          className="course-media"
          style={{
            position: 'relative',
            background: `linear-gradient(140deg, ${startColor}, ${endColor})`,
            flexShrink: 0
          }}
        >
          <img
            src={imageSrc}
            alt={course.title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=700&h=500&fit=crop';
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(160deg, rgba(15, 23, 42, 0) 10%, rgba(15, 23, 42, 0.55) 100%)',
            }}
          />
          {/* Category badge (top-left) */}
          <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', color: '#ffffff' }}>
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
                backdropFilter: 'blur(2px)'
              }}
            >
              {course.subtitle || course.category || 'Course'}
            </span>
          </div>
          {/* Title (bottom-left) */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', color: '#ffffff' }}>
            <h3 style={{ marginTop: 0, fontSize: '1.35rem', fontWeight: 600, lineHeight: 1.2 }}>
              {course.title}
            </h3>
          </div>
        </div>

        {/* Bottom actions */}
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
            {showEnroll && (
              <button
                type="button"
                onClick={handleEnroll}
                style={{
                  marginTop: '0.75rem',
                  border: 'none',
                  background: 'linear-gradient(135deg, #4c1d95, #6d28d9)',
                  color: '#ffffff',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '9999px'
                }}
              >
                Enroll now
                <span
                  style={{
                    width: '20px', height: '20px', borderRadius: '9999px', background: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}
                >
                  <ArrowRight size={13} color={'#4c1d95'} />
                </span>
              </button>
            )}
            <span style={{ color: '#475569', fontWeight: 600 }}>
              {typeof course.price === 'number' ? `$${course.price.toFixed(2)}` : course.price ? `$${parseFloat(course.price).toFixed(2)}` : 'Free'}
            </span>
            <button
              type="button"
              onClick={handleViewDetails}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#4c1d95',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
                padding: '0.45rem 0.6rem',
              }}
            >
              View details
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(CourseCard);

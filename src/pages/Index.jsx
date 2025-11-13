import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import LoggedInHome from './LoggedInHome';

export default function Index() {
  const { user } = useAuth();
  if (user) {
    return <LoggedInHome />;
  }
  return <LoggedOutHome />;
}

function LoggedOutHome() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { COURSE_CATEGORIES } = { COURSE_CATEGORIES: ['Web Development', 'Mobile Development', 'Data Science', 'Design', 'Business'] };

  const { data, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        return await response.json();
      } catch (err) {
        console.error('Error fetching courses:', err);
        toast.error('Failed to load courses');
        return [];
      }
    },
    staleTime: 1000 * 60,
  });

  const courses = data || [];

  useMemo(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 250);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredCourses = useMemo(() => {
    let filtered = courses;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase();
      filtered = filtered.filter(course =>
        (course.title || '').toLowerCase().includes(term) ||
        (course.description || '').toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [courses, selectedCategory, debouncedSearch]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1rem'
              }}>
                Welcome to SkillSync
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              fontWeight: '900',
              lineHeight: '1.2',
              marginBottom: '1.5rem'
            }}>
              Learning is <span style={{
                background: '#fbbf24',
                color: '#1f2937',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                display: 'inline-block',
                marginRight: '0.5rem'
              }}>What You Make</span> of it
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              color: '#e0e7ff',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '500px'
            }}>
              Learn from industry experts with hands-on courses and real-world projects. Transform your skills and advance your career.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#5E3FDE',
                  color: '#ffffff',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 20px rgba(94, 63, 222, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => window.location.href = '/courses'}
              >
                Start Learning
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  padding: '0.75rem 1.5rem',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <Play size={20} fill="#ffffff" />
                Watch Demo
              </motion.button>
            </div>

            <div style={{
              display: 'flex',
              gap: '3rem',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.25rem' }}>10k+</div>
                <div style={{ fontSize: '0.875rem', color: '#e0e7ff' }}>Active Students</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.25rem' }}>150+</div>
                <div style={{ fontSize: '0.875rem', color: '#e0e7ff' }}>Expert Instructors</div>
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '0.25rem' }}>500+</div>
                <div style={{ fontSize: '0.875rem', color: '#e0e7ff' }}>Video Courses</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Featured Course Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{
              borderRadius: '1.5rem',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '350px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
              background: '#ffffff'
            }}>
              <img
                src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=500&h=300&fit=crop"
                alt="Web Development Course"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ color: '#5E3FDE', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  WEB DEVELOPMENT
                </div>
                <h3 style={{ color: '#1f2937', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  WordPress Web Design
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Learn to build stunning websites with WordPress
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ color: '#fbbf24' }}>★★★★★</div>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>(4.9)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Logos Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: '2rem',
          background: '#ffffff',
          borderBottom: '1px solid #e5e7eb'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            TRUSTED BY LEADING COMPANIES
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '2rem',
            alignItems: 'center',
            justifyItems: 'center'
          }}>
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company, i) => (
              <div key={i} style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#9ca3af'
              }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achieve Your Goal Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Achieve Your Goal With SkillSync
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Get access to thousands of courses, from beginner to advanced level
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '📚', title: 'Recent Courses', desc: 'Learn the latest skills from the newest courses added to our platform' },
              { icon: '⚡', title: 'Effective Courses', desc: 'Join thousands of students in our most effective and popular courses' },
              { icon: '🏅', title: 'Earn Certificates', desc: 'Earn recognized certificates upon completing each course' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '2rem',
                  borderRadius: '1.25rem',
                  background: i === 0 ? '#e0f2fe' : i === 1 ? '#f0e7fe' : '#fef3c7',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Instructor Spotlight Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#f8fafc'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(94, 63, 222, 0.2)',
                border: '8px solid #5E3FDE'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="Instructor"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span style={{
                display: 'inline-block',
                background: '#e0f2fe',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: '#0284c7',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                FEATURED INSTRUCTOR
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Sarah Johnson
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: 1.8
              }}>
                Lead Web Development instructor with 10+ years of industry experience. Sarah has taught over 15,000 students and maintains a 4.9-star rating across all courses.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#5E3FDE' }}>15k+</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Students</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#5E3FDE' }}>4.9 ⭐</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Rating</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  background: '#5E3FDE',
                  color: '#ffffff',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                View All Instructors
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Best Courses Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              marginBottom: '1rem'
            }}>
              Explore Our World's Best Courses
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
              color: '#e0e7ff',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Choose from a wide variety of courses covering all major fields
            </p>
          </motion.div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap'
          }}>
            {['All', ...COURSE_CATEGORIES].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.625rem 1.5rem',
                  borderRadius: '9999px',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  background: selectedCategory === cat ? '#5E3FDE' : 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.3)', borderTop: '4px solid #ffffff', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem'
            }}>
              {filteredCourses.slice(0, 4).map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                  }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#5E3FDE',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {course.category}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {course.title}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '1rem'
                    }}>
                      By {course.instructor}
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '900',
                        color: '#5E3FDE'
                      }}>
                        ${course.price || '0'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => window.location.href = `/course/${course._id}`}
                        style={{
                          background: '#5E3FDE',
                          color: '#ffffff',
                          padding: '0.5rem 1.25rem',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        Enroll
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = '/courses'}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                padding: '0.75rem 2.5rem',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '0.5rem',
                fontWeight: '700',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              View All Courses
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Why Choose SkillSync?
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🎓', title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience' },
              { icon: '💻', title: 'Hands-On Learning', desc: 'Real projects, real-world applications, real results' },
              { icon: '📱', title: 'Learn Anywhere', desc: 'Access courses on any device, anytime, anywhere' },
              { icon: '🏆', title: 'Certified Skills', desc: 'Earn recognized certificates that boost your career' },
              { icon: '👥', title: 'Community', desc: 'Connect with thousands of learners worldwide' },
              { icon: '💬', title: '24/7 Support', desc: 'Get help whenever you need it from our team' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(94, 63, 222, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #5E3FDE 0%, #220359 100%)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
            fontWeight: '900',
            marginBottom: '1rem'
          }}>
            Ready to Transform Your Career?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#e0e7ff',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Join thousands of students learning from the best instructors and earning recognized certificates.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: '#fbbf24',
              color: '#1f2937',
              padding: '1rem 2.5rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/register'}
          >
            Sign Up Now
          </motion.button>
        </div>
      </motion.section>

      {/* Join Our Free Workshops Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="Free Workshops"
                style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span style={{
                display: 'inline-block',
                background: '#e0f2fe',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                color: '#0284c7',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                FREE WORKSHOPS
              </span>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Join Our Free Workshops
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: 1.8
              }}>
                Participate in our weekly free workshops and master new skills from industry experts.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: '#f0e7fe',
                  borderLeft: '4px solid #a855f7'
                }}>
                  <div style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>Web Development</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Every Monday 6 PM</div>
                </div>
                <div style={{
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  background: '#dbeafe',
                  borderLeft: '4px solid #0284c7'
                }}>
                  <div style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.25rem' }}>UI/UX Design</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Every Wednesday 7 PM</div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  background: '#5E3FDE',
                  color: '#ffffff',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Join Free Workshop
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Thousands of Experts Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '2rem'
              }}>
                <span style={{ background: '#fbbf24', color: '#1f2937', padding: '0.25rem 0.75rem', borderRadius: '0.375rem', marginRight: '0.5rem' }}>45k+</span>
                <br />
                Authorized by <br /> Industry Experts
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#e0e7ff',
                marginBottom: '2rem',
                lineHeight: 1.8
              }}>
                Learn from the best professionals in the industry with proven expertise and years of experience.
              </p>
              <div style={{
                display: 'flex',
                gap: '3rem'
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '900' }}>328+</div>
                  <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Expert Instructors</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '900' }}>95%</div>
                  <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Success Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}>
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Expert"
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '0.75rem',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop';
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Top Instructors Carousel Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              marginBottom: '1rem'
            }}>
              Our Top Class & Professional Instructors In One Place
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&h=140&fit=crop' },
              { name: 'Mike Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140&h=140&fit=crop' },
              { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=140&h=140&fit=crop' },
              { name: 'David Kumar', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=140&h=140&fit=crop' },
              { name: 'Lisa Anderson', image: 'https://images.unsplash.com/photo-1507527173827-ae90b3639c27?w=140&h=140&fit=crop' },
              { name: 'James Wilson', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=140&h=140&fit=crop' },
              { name: 'Alex Turner', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=140&h=140&fit=crop' },
              { name: 'Mia Wong', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&h=140&fit=crop' }
            ].map((instructor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '0.75rem',
                    border: '4px solid #fbbf24'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=140&h=140&fit=crop';
                  }}
                />
                <h3 style={{ fontSize: '0.95rem', fontWeight: '700' }}>
                  {instructor.name.split(' ')[0]}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trending Courses Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#f8fafc'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Trending Now
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Check out the most popular courses right now
            </p>
          </motion.div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #e5e7eb', borderTop: '4px solid #5E3FDE', borderRadius: '50%', margin: '0 auto', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredCourses.slice(0, 3).map((course, i) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    background: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(94, 63, 222, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'}
                  />
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      {course.title}
                    </h3>
                    <span style={{ fontSize: '0.875rem', color: '#5E3FDE', fontWeight: '600' }}>
                      ${course.price || '0'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Join Our Community and Make it Bigger
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: 1.8
              }}>
                Connect with thousands of learners, share experiences, and grow together in our vibrant community.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                style={{
                  background: '#5E3FDE',
                  color: '#ffffff',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '700',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Join Community
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem'
              }}
            >
              {[
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1552968036-acdb99bda52d?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop',
                'https://images.unsplash.com/photo-1552968036-acdb99bda52d?w=200&h=150&fit=crop'
              ].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Community"
                  style={{
                    width: '100%',
                    height: '150px',
                    borderRadius: '0.75rem',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=150&fit=crop';
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Blog/News Feed Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(135deg, #220359 0%, #4906BF 100%)',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          color: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              marginBottom: '1rem'
            }}>
              Our Latest News Feed
            </h2>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { title: 'How to Stand Out in the Tech Industry', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=150&fit=crop' },
              { title: 'New Course Launch: Advanced React', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=150&fit=crop' },
              { title: 'Student Success Story: From Beginner to Expert', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=150&fit=crop' },
              { title: 'Industry Trends in 2024', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=150&fit=crop' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '1.5rem',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '150px', borderRadius: '0.5rem', objectFit: 'cover', marginBottom: '1rem' }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=150&fit=crop';
                  }}
                />
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#e0e7ff', marginBottom: '1rem' }}>
                  Discover the latest updates and insights from our platform.
                </p>
                <a href="#" style={{ color: '#fbbf24', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                  Read More →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Become Instructor/Student Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#f8fafc'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem'
          }}>
            {[
              { title: 'Become an Instructor', desc: 'Share your expertise and earn by teaching others', icon: '👨‍🏫', btnColor: '#5E3FDE' },
              { title: 'Become a Student', desc: 'Join thousands of learners and advance your career', icon: '👨‍🎓', btnColor: '#5E3FDE' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '2rem',
                  borderRadius: '1.25rem',
                  background: '#ffffff',
                  border: '2px solid #e5e7eb',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1f2937', marginBottom: '0.75rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: item.btnColor,
                    color: '#ffffff',
                    padding: '0.75rem 2rem',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.location.href = i === 0 ? '/dashboard' : '/courses'}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem)',
          background: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.75rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {[
              { q: 'How do I get started with SkillSync?', a: 'Simply sign up for a free account and browse our course catalog. You can start learning immediately.' },
              { q: 'Are the courses self-paced?', a: 'Yes, all our courses are self-paced, allowing you to learn at your own convenience.' },
              { q: 'Do I get a certificate after completing a course?', a: 'Yes, upon successful completion of any course, you will receive a recognized certificate.' },
              { q: 'Can I refund a course?', a: 'We offer a 30-day money-back guarantee on all courses.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem' }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.6 }}>
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

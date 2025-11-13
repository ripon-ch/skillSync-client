import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, DollarSign, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewForm from '../components/ReviewForm';
import ReviewDisplay from '../components/ReviewDisplay';
import NotesForm from '../components/NotesForm';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [reviewsRefresh, setReviewsRefresh] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) throw new Error('Course not found');
      return response.json();
    },
    retry: 3,
  });

  const { data: enrollment, refetch } = useQuery({
    queryKey: ['enrollment', id, user?.email],
    queryFn: async () => {
      if (!user?.email) return { enrolled: false };
      const response = await fetch(`/api/enrollments/check/${id}?email=${encodeURIComponent(user.email)}`);
      if (!response.ok) return { enrolled: false };
      return response.json();
    },
    enabled: !!user?.email,
  });

  const isEnrolled = !!enrollment?.enrolled;

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in a course');
      navigate('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: id,
          userEmail: user.email,
        }),
      });

      if (!response.ok) {
        let data = null;
        try { data = await response.json(); } catch {}
        if (data && (data.error === 'Already enrolled in this course' || data.error === 'Already enrolled')) {
          toast.success('Already enrolled');
          await refetch();
          queryClient.invalidateQueries({ queryKey: ['enrollment', id, user.email] });
          navigate('/my-enrolled-courses');
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
        toast.success('Successfully enrolled in the course!');
        await refetch();
        queryClient.invalidateQueries({ queryKey: ['enrollment', id, user.email] });
        navigate('/my-enrolled-courses');
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
      toast.success('Successfully enrolled in the course!');
      await refetch();
      queryClient.invalidateQueries({ queryKey: ['enrollment', id, user.email] });
      navigate('/my-enrolled-courses');
    } catch (error) {
      console.error('Error enrolling:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Course not found</p>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>
      </div>

      {/* Course Header */}
      <div style={{background: "linear-gradient(to right, #220359, #4906BF)"}}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content */}
            <div className="lg:col-span-2">
              <div className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold mb-4">
                {data.category}
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{data.title}</h1>
              <p className="text-white/90 text-lg mb-6">{data.description}</p>
              
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{data.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>{data.instructor}</span>
                </div>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
              <div className="mb-6">
                <p className="text-muted-foreground text-sm mb-1">Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">${data.price}</span>
                </div>
              </div>

              {user?.email === data.instructorEmail ? (
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/update-course/${id}`)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#e5e7eb',
                      color: '#1f2937',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  >
                    Edit Course
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this course?')) {
                        try {
                          const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
                          if (response.ok) {
                            toast.success('Course deleted');
                            navigate('/my-courses');
                          }
                        } catch (err) {
                          toast.error('Failed to delete course');
                        }
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: '#fee2e2',
                      color: '#dc2626',
                      border: '1px solid #fca5a5',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
                  >
                    Delete Course
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling || isEnrolled}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: isEnrolled ? '#cbd5e1' : 'linear-gradient(135deg, #4c1d95, #6d28d9)',
                      color: isEnrolled ? '#6b7280' : '#ffffff',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      cursor: isEnrolling || isEnrolled ? 'not-allowed' : 'pointer',
                      opacity: isEnrolling || isEnrolled ? 0.7 : 1,
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      if (!isEnrolling && !isEnrolled) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #3d1672, #5a20c1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isEnrolling && !isEnrolled) {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #4c1d95, #6d28d9)';
                      }
                    }}
                  >
                    {isEnrolled ? 'Already Enrolled' : isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>

                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ Lifetime access to course materials
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          {/* Course Image */}
          <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8 border border-border">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* About Section */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About This Course</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {data.description}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This comprehensive course is designed to take you from beginner to advanced level. You'll learn industry best practices, real-world applications, and gain hands-on experience with practical projects.
            </p>
          </div>

          {/* What You'll Learn */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">What You'll Learn</h2>
            <ul className="space-y-3">
              {[
                'Master the fundamentals and core concepts',
                'Build real-world projects from scratch',
                'Learn industry best practices and patterns',
                'Get access to exclusive resources and tools',
                'Join a community of learners',
                'Get lifetime access to all course materials',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-foreground">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor Info */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Instructor</h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={`https://via.placeholder.com/150?text=${encodeURIComponent(data.instructor)}`}
                  alt={data.instructor}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{data.instructor}</h3>
                <p className="text-muted-foreground">Expert Instructor</p>
              </div>
            </div>
          </div>

          {/* Notes Section - Only show if enrolled */}
          {isEnrolled && (
            <NotesForm courseId={id} />
          )}

          {/* Reviews Section */}
          <ReviewForm courseId={id} onReviewSubmitted={() => setReviewsRefresh((n) => n + 1)} />
          <ReviewDisplay key={reviewsRefresh} courseId={id} />
        </div>
      </div>
    </div>
  );
}

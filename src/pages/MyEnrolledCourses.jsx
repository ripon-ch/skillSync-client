import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, BookOpen, Trash2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

export default function MyEnrolledCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unenrollConfirm, setUnenrollConfirm] = useState(null);
  const [enrollmentProgress, setEnrollmentProgress] = useState({});

  useEffect(() => {
    if (user?.email) fetchEnrolledCourses(user.email);
  }, [user?.email]);

  const fetchEnrolledCourses = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(email)}`);
      let data = [];
      if (response.ok) {
        const serverData = await response.json();
        if (Array.isArray(serverData) && serverData.length > 0) {
          data = serverData;
        }
      }

      // Always check localStorage as fallback or supplement
      if (data.length === 0) {
        const key = `enrollments:${email}`;
        const localIds = JSON.parse(localStorage.getItem(key) || '[]');
        if (localIds.length > 0) {
          try {
            const allRes = await fetch('/api/courses');
            const allCourses = await allRes.json();
            if (Array.isArray(allCourses)) {
              data = allCourses.filter((c) => {
                const courseId = String(c._id || c.id);
                return localIds.some(localId => String(localId) === courseId);
              });
            }
          } catch (fetchErr) {
            console.error('Error fetching courses:', fetchErr);
          }
        }
      }

      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      toast.error('Failed to load your enrolled courses');
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      const response = await fetch(`/api/enrollments/user/${courseId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email })
      });

      if (response.ok) {
        toast.success('Unenrolled successfully');
        setCourses(courses.filter(c => c._id !== courseId));
        const key = `enrollments:${user.email}`;
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify(list.filter(id => String(id) !== String(courseId))));
        setUnenrollConfirm(null);
      } else {
        toast.error('Failed to unenroll');
      }
    } catch (error) {
      console.error('Error unenrolling:', error);
      toast.error('Failed to unenroll');
    }
  };

  const handleUpdateProgress = async (courseId) => {
    const progress = parseInt(enrollmentProgress[courseId] || 0);
    if (progress < 0 || progress > 100) {
      toast.error('Progress must be between 0 and 100');
      return;
    }

    try {
      const response = await fetch(`/api/enrollments/user/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, progress })
      });

      if (response.ok) {
        toast.success('Progress updated');
        setEnrollmentProgress(prev => ({ ...prev, [courseId]: '' }));
      } else {
        toast.error('Failed to update progress');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div style={{background: "linear-gradient(to right, #220359, #4906BF)", padding: "3rem 0"}}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">My Enrolled Courses</h1>
          <p className="text-white/90">View and manage the courses you're currently learning</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                {/* Image */}
                <div className="w-full h-40 overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Category */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {course.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                    {course.description}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>{course.instructor}</span>
                    </div>
                  </div>

                  {/* Progress Input */}
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <label className="text-xs font-semibold text-slate-600 block mb-2">Your Progress (%)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={enrollmentProgress[course._id] || ''}
                        onChange={(e) => setEnrollmentProgress(prev => ({ ...prev, [course._id]: e.target.value }))}
                        placeholder="0-100"
                        className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleUpdateProgress(course._id)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          background: '#5E3FDE',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-bold text-lg text-foreground">${course.price}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => window.location.href = `/course/${course._id}`}
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
                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>→</span>
                      </button>
                      <button
                        onClick={() => setUnenrollConfirm(course._id)}
                        style={{
                          padding: '0.4rem 0.6rem',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: '1px solid #fca5a5',
                          borderRadius: '0.375rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        <Trash2 size={14} />
                        Unenroll
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unenroll Confirmation */}
                {unenrollConfirm === course._id && (
                  <div className="bg-red-50 border-t border-red-200 p-4 flex items-center justify-between">
                    <p className="text-sm text-red-700">
                      Are you sure you want to unenroll from this course?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUnenrollConfirm(null)}
                        className="px-3 py-1 text-sm border border-slate-300 rounded hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUnenroll(course._id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Unenroll
                      </button>
                    </div>
                  </div>
                )}

                {/* Enrollment Badge */}
                <div className="bg-green-50 dark:bg-green-950 px-5 py-3 border-t border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-400">✓ You are enrolled in this course</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">You haven't enrolled in any courses yet</p>
            <Link
              to="/courses"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

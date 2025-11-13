import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Edit2, Trash2, Eye, Plus, RefreshCw, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function MyCourses() {
  const { user, isInstructor } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('created');
  const [createdCourses, setCreatedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [unenrollConfirm, setUnenrollConfirm] = useState(null);
  const [enrollmentProgress, setEnrollmentProgress] = useState({});

  const handleTabChange = (tab) => {
    if (tab === 'enrolled' && isInstructor) {
      toast.error('Instructors cannot view enrolled courses. Only students can enroll in courses.');
      return;
    }
    setActiveTab(tab);
  };

  const fetchMyCourses = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);

      // Fetch created courses
      const createdRes = await fetch(`/api/courses/user/my-courses?email=${encodeURIComponent(user.email)}`);
      const createdData = await createdRes.json();
      console.log('Created courses:', createdData);
      setCreatedCourses(Array.isArray(createdData) ? createdData : []);

      // Fetch enrolled courses
      let enrolledData = [];
      try {
        const enrolledRes = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(user.email)}`);
        if (enrolledRes.ok) {
          const serverData = await enrolledRes.json();
          if (Array.isArray(serverData) && serverData.length > 0) {
            enrolledData = serverData;
          }
        }
      } catch (err) {
        console.error('Error fetching enrollments from API:', err);
      }

      // Fallback to localStorage if no data from API
      if (enrolledData.length === 0) {
        const key = `enrollments:${user.email}`;
        const localIds = JSON.parse(localStorage.getItem(key) || '[]');
        if (localIds.length > 0) {
          try {
            const allRes = await fetch('/api/courses');
            const allCourses = await allRes.json();
            if (Array.isArray(allCourses)) {
              enrolledData = allCourses.filter((c) => {
                const courseId = String(c._id || c.id);
                return localIds.some(localId => String(localId) === courseId);
              });
            }
          } catch (fetchErr) {
            console.error('Error fetching courses for fallback:', fetchErr);
          }
        }
      }

      console.log('Enrolled courses:', enrolledData);
      setEnrolledCourses(Array.isArray(enrolledData) ? enrolledData : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load your courses');
      setCreatedCourses([]);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');

      toast.success('Course deleted successfully');
      setCreatedCourses(createdCourses.filter(c => c._id !== courseId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
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
        setEnrolledCourses(enrolledCourses.filter(c => c._id !== courseId));
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

  const renderCourseCard = (course, isCreated = true) => (
    <div key={course._id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
        {/* Image */}
        <div className="md:col-span-1">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded">
              {course.category}
            </span>
            <span className="text-muted-foreground">${course.price}</span>
            <span className="text-muted-foreground">{course.duration}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
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

          {isCreated ? (
            <>
              <Link
                to={`/update-course/${course._id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  background: '#e5e7eb',
                  color: '#1f2937',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#d1d5db'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#e5e7eb'}
              >
                <Edit2 size={16} />
                Update
              </Link>
              <button
                onClick={() => setDeleteConfirm(course._id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          ) : (
            <>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={enrollmentProgress[course._id] || ''}
                  onChange={(e) => setEnrollmentProgress(prev => ({ ...prev, [course._id]: e.target.value }))}
                  placeholder="Progress %"
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                />
                <button
                  onClick={() => handleUpdateProgress(course._id)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: '#5E3FDE',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Save
                </button>
              </div>
              <button
                onClick={() => setUnenrollConfirm(course._id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1rem',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fca5a5',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fecaca'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fee2e2'}
              >
                <Trash2 size={16} />
                Unenroll
              </button>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {isCreated && deleteConfirm === course._id && (
        <div className="bg-destructive/10 border-t border-destructive/30 p-4 flex items-center justify-between">
          <p className="text-sm text-destructive">
            Are you sure you want to delete this course?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(course._id)}
              className="px-4 py-2 text-sm bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Unenroll Confirmation */}
      {!isCreated && unenrollConfirm === course._id && (
        <div className="bg-red-50 border-t border-red-200 p-4 flex items-center justify-between">
          <p className="text-sm text-red-700">
            Are you sure you want to unenroll from this course?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setUnenrollConfirm(null)}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUnenroll(course._id)}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Unenroll
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div style={{background: "linear-gradient(to right, #220359, #4906BF)", padding: "3rem 0"}}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
            <p className="text-white/90">Manage your created and enrolled courses</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => fetchMyCourses()}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <RefreshCw size={20} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              Refresh
            </button>
            <Link
              to="/add-course"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#ffffff',
                color: '#220359',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              <Plus size={20} />
              Add Course
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4" style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '0' }}>
          <button
            onClick={() => handleTabChange('created')}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'created' ? '#5E3FDE' : 'transparent',
              color: activeTab === 'created' ? '#ffffff' : '#6b7280',
              border: 'none',
              borderBottom: activeTab === 'created' ? '3px solid #5E3FDE' : 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            Created Courses ({createdCourses.length})
          </button>
          <button
            onClick={() => handleTabChange('enrolled')}
            disabled={isInstructor}
            style={{
              padding: '1rem 2rem',
              background: activeTab === 'enrolled' ? '#5E3FDE' : 'transparent',
              color: activeTab === 'enrolled' ? '#ffffff' : '#6b7280',
              border: 'none',
              borderBottom: activeTab === 'enrolled' ? '3px solid #5E3FDE' : 'none',
              fontWeight: '600',
              cursor: isInstructor ? 'not-allowed' : 'pointer',
              opacity: isInstructor ? 0.5 : 1,
              transition: 'all 0.3s'
            }}
          >
            <BookOpen size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Enrolled Courses ({enrolledCourses.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : activeTab === 'enrolled' && isInstructor ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <p style={{ color: '#dc2626', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              Instructors cannot view enrolled courses. Only students can enroll in courses.
            </p>
            <button
              onClick={() => handleTabChange('created')}
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#5E3FDE',
                color: '#ffffff',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#4a2fa8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#5E3FDE'}
            >
              Go to Created Courses
            </button>
          </div>
        ) : activeTab === 'created' ? (
          createdCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {createdCourses.map((course) => renderCourseCard(course, true))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                You haven't created any courses yet
              </p>
              <Link
                to="/add-course"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#5E3FDE',
                  color: '#ffffff',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a2fa8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#5E3FDE'}
              >
                Create Your First Course
              </Link>
            </div>
          )
        ) : (
          enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {enrolledCourses.map((course) => renderCourseCard(course, false))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                You haven't enrolled in any courses yet
              </p>
              <Link
                to="/courses"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#5E3FDE',
                  color: '#ffffff',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4a2fa8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#5E3FDE'}
              >
                Browse Courses
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

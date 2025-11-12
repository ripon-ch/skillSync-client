import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clock, BookOpen, User, DollarSign, CheckCircle } from 'lucide-react';

export default function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (user?.email && course?._id) checkEnrollment(user.email, course._id);
  }, [user, course]);

  // Fetch course details
  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${id}`);
      if (!response.ok) throw new Error('Failed to load course details');
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  // Check if user is enrolled
  const checkEnrollment = async (email, courseId) => {
    try {
      const response = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(email)}`);
      if (!response.ok) return;
      const enrolledCourses = await response.json();
      setIsEnrolled(enrolledCourses.some((c) => String(c._id || c.id) === String(courseId)));
    } catch {
      // fallback to local storage
      const key = `enrollments:${email}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      setIsEnrolled(stored.includes(String(courseId)));
    }
  };

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      toast.warning('Please log in to enroll in this course');
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          courseId: course._id,
        }),
      });

      if (!response.ok) throw new Error('Failed to enroll');

      // store locally for fallback
      const key = `enrollments:${user.email}`;
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      if (!stored.includes(course._id)) {
        stored.push(course._id);
        localStorage.setItem(key, JSON.stringify(stored));
      }

      setIsEnrolled(true);
      toast.success('Successfully enrolled!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Course not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-white/90 max-w-2xl">{course.description}</p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">About this course</h2>
            <p className="text-muted-foreground leading-relaxed">
              {course.longDescription ||
                'This course provides in-depth learning materials, projects, and mentorship to help you master the topic effectively.'}
            </p>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-6 h-fit shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock size={18} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <User size={18} />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <BookOpen size={18} />
              <span>{course.category}</span>
            </div>
            <div className="flex items-center gap-3 text-foreground font-semibold">
              <DollarSign size={18} />
              <span>${course.price}</span>
            </div>
          </div>

          {isEnrolled ? (
            <button
              onClick={() => navigate('/my-enrolled-courses')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              <CheckCircle size={18} />
              Enrolled – Go to My Courses
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? 'Enrolling…' : 'Enroll Now'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

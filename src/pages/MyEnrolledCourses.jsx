import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export default function MyEnrolledCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchEnrolledCourses(user.email);
  }, [user?.email]);

  const fetchEnrolledCourses = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(email)}`);
      let data = [];
      if (response.ok) {
        data = await response.json();
      }
      if (!Array.isArray(data) || data.length === 0) {
        // Fallback to client-side stored enrollments
        const key = `enrollments:${email}`;
        const localIds = JSON.parse(localStorage.getItem(key) || '[]');
        if (localIds.length > 0) {
          const allRes = await fetch('/api/courses');
          const allCourses = await allRes.json();
          data = allCourses.filter((c) => localIds.includes(String(c._id || c.id)));
        }
      }
      setCourses(data);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      toast.error('Failed to load your enrolled courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
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

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-bold text-lg text-foreground">${course.price}</span>
                    <Link
                      to={`/course/${course._id}`}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      View Course
                    </Link>
                  </div>
                </div>

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

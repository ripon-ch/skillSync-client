import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';

export default function MyCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (user?.email) fetchMyCourses(user.email);
  }, [user?.email]);

  const fetchMyCourses = async (email) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/courses/user?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Failed to fetch courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete course');
      toast.success('Course deleted successfully!');
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete course');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-white">My Courses</h1>
          <Link
            to="/add-course"
            className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            + Add New Course
          </Link>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container mx-auto px-4 py-12">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">You haven't added any courses yet.</p>
            <Link
              to="/add-course"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg flex flex-col h-full">
                {/* Image */}
                <div className="w-full h-40 overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{course.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-bold text-lg text-foreground">${course.price}</span>
                    <div className="flex gap-2">
                      <Link
                        to={`/update-course/${course._id}`}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id)}
                        disabled={deletingId === course._id}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        {deletingId === course._id ? <Loader size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

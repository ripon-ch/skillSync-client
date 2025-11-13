import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Edit2, Trash2, Eye, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, [user]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/user/my-courses?email=${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');

      toast.success('Course deleted successfully');
      setCourses(courses.filter(c => c._id !== courseId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Courses</h1>
            <p className="text-white/90">Manage the courses you have created</p>
          </div>
          <Link
            to="/add-course"
            className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Plus size={20} />
            Add Course
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
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
                  <div className="md:col-span-1 flex flex-col gap-2 justify-center">
                    <Link
                      to={`/course/${course._id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                    <Link
                      to={`/update-course/${course._id}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <Edit2 size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteConfirm(course._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-destructive/50 text-destructive rounded-lg hover:bg-destructive/10 transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === course._id && (
                  <div className="bg-destructive/10 border-t border-destructive/30 p-4 flex items-center justify-between">
                    <p className="text-sm text-destructive">
                      Are you sure you want to delete this course? This action cannot be undone.
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">You haven't created any courses yet</p>
            <Link
              to="/add-course"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Your First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

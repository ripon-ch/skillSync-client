import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadToImgbb } from '../lib/imgbb';
import { COURSE_CATEGORIES } from '../../shared/api';
import { toast } from 'sonner';
import { Loader, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
    duration: '',
    category: COURSE_CATEGORIES[0],
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description || !formData.image || !formData.price || !formData.duration) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, price: parseFloat(formData.price) }),
      });

      if (!response.ok) throw new Error('Failed to add course');

      toast.success('Course added successfully!');
      navigate('/my-courses');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/my-courses')}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to My Courses
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Add New Course</h1>
          <p className="text-white/90">Create a new course for your students</p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                Course Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter course title"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description"
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
                Course Image *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  id="image"
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="md:col-span-2 w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <label className="w-full inline-flex items-center justify-center px-4 py-2 border border-border rounded-lg bg-muted hover:bg-muted/70 cursor-pointer text-sm font-medium">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      setUploadingImage(true);
                      try {
                        const url = await uploadToImgbb(file);
                        setFormData((prev) => ({ ...prev, image: url }));
                        toast.success('Image uploaded');
                      } catch (err) {
                        toast.error(err?.message || 'Failed to upload image');
                      } finally {
                        setUploadingImage(false);
                        e.target.value = '';
                      }
                    }}
                  />
                  {uploadingImage ? 'Uploading…' : 'Upload Image'}
                </label>
              </div>
              {formData.image && (
                <div className="mt-3">
                  <img src={formData.image} alt="Preview" className="w-full max-w-sm h-40 object-cover rounded border border-border" />
                </div>
              )}
            </div>

            {/* Price, Duration, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
                  Price ($) *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99.99"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-foreground mb-2">
                  Duration *
                </label>
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 40 hours"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {COURSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3">
              <input
                id="isFeatured"
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-foreground cursor-pointer">
                Mark this course as featured
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader size={20} className="animate-spin" />}
                {loading ? 'Adding...' : 'Add Course'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/my-courses')}
                className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

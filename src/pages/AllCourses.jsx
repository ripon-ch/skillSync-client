// Path: ~/skillSync/client/src/pages/AllCourses.jsx

import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// 🚨 NEW IMPORT 🚨
import useCourses from '../hooks/useCourses.js'; 

// NOTE: You still need COURSE_CATEGORIES here for the <select> element
import { COURSE_CATEGORIES } from '../../../shared/api.js'; 

export default function AllCourses() {
  // 🚨 REPLACED ALL STATE AND FETCHING LOGIC WITH THIS HOOK 🚨
  const {
    filteredCourses,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useCourses();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Explore Courses</h1>
          <p className="text-white/90">Browse all available courses and start learning today</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full md:w-1/2">
            <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Categories</option>
              {COURSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No courses found matching your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* ... (Rest of the course card rendering remains the same) ... */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 space-y-3">
                  <h2 className="text-lg font-semibold text-foreground line-clamp-1">
                    {course.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-primary">
                      ${course.price}
                    </span>
                    <span className="text-muted-foreground">{course.duration}</span>
                  </div>
                  <Link
                    to={`/courses/${course._id}`}
                    className="block w-full text-center py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// Path: ~/skillSync/client/src/hooks/useCourses.js

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// You might need to import COURSE_CATEGORIES here if other pages use the hook
// import { COURSE_CATEGORIES } from '../../shared/api.js'; 

export default function useCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    // NOTE: If you need COURSE_CATEGORIES here, make sure to import it above.
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, courses]);

  // Return all state and setters required by the component
  return {
    filteredCourses,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
}
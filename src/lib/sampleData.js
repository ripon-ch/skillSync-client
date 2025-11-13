/**
 * Sample Data for SkillSync
 * Used for development and testing
 * Replace with real API calls in production
 */

import { COURSE_CATEGORIES } from '../../../shared/api.js';

// Re-export for backward compatibility
export { COURSE_CATEGORIES };

export const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript basics to build stunning web applications.',
    instructor: 'John Smith',
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    rating: 4.8,
    students,
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Master the fundamentals of web development. This comprehensive course covers HTML5, CSS3, and JavaScript ES6+. You\'ll build real projects and learn modern web development practices.',
    content: [
      { id, title: 'Introduction to HTML', duration: '45 min', completed },
      { id, title: 'CSS Styling & Layout', duration: '60 min', completed },
      { id, title: 'JavaScript Basics', duration: '75 min', completed },
      { id, title: 'DOM Manipulation', duration: '90 min', completed },
      { id, title: 'Project: Build a Todo App', duration: '120 min', completed },
    ],
  },
  {
    id: '2',
    title: 'Advanced React.js Mastery',
    description: 'Deep dive into React hooks, state management, and performance optimization.',
    instructor: 'Jane Doe',
    category: 'Frontend',
    level: 'Intermediate',
    price: 79.99,
    rating: 4.9,
    students,
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1633356713697-f1b5eb5c1f4a?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Take your React skills to the next level. Learn advanced patterns, custom hooks, state management with Redux, and performance optimization techniques.',
    content: [
      { id, title: 'React Hooks Deep Dive', duration: '90 min', completed },
      { id, title: 'Custom Hooks', duration: '75 min', completed },
      { id, title: 'State Management with Redux', duration: '120 min', completed },
      { id, title: 'Performance Optimization', duration: '105 min', completed },
    ],
  },
  {
    id: '3',
    title: 'Full Stack Development with MERN',
    description: 'Build complete web applications using MongoDB, Express, React, and Node.js.',
    instructor: 'Mike Johnson',
    category: 'Full Stack',
    level: 'Advanced',
    price: 99.99,
    rating: 4.7,
    students,
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Complete MERN stack course. Learn to build scalable web applications from database to frontend. Includes authentication, deployment, and real-world projects.',
    content: [
      { id, title: 'Node.js & Express Setup', duration: '60 min', completed },
      { id, title: 'MongoDB Fundamentals', duration: '90 min', completed },
      { id, title: 'REST API Development', duration: '120 min', completed },
      { id, title: 'React Frontend Integration', duration: '150 min', completed },
    ],
  },
  {
    id: '4',
    title: 'Mobile Development with React Native',
    description: 'Create native mobile applications for iOS and Android using React Native.',
    instructor: 'Sarah Williams',
    category: 'Mobile',
    level: 'Intermediate',
    price: 69.99,
    rating: 4.6,
    students,
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Learn mobile development with React Native. Build cross-platform applications for iOS and Android with a single codebase.',
    content: [
      { id, title: 'React Native Setup', duration: '45 min', completed },
      { id, title: 'Native Components', duration: '75 min', completed },
      { id, title: 'Navigation & Routing', duration: '90 min', completed },
    ],
  },
  {
    id: '5',
    title: 'Python for Data Science',
    description: 'Learn Python programming and data analysis with Pandas, NumPy, and Matplotlib.',
    instructor: 'Dr. Robert Brown',
    category: 'Data Science',
    level: 'Intermediate',
    price: 79.99,
    rating: 4.8,
    students,
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Master Python for data science. Learn data manipulation, visualization, and machine learning fundamentals.',
    content: [
      { id, title: 'Python Basics', duration: '60 min', completed },
      { id, title: 'Pandas & Data Manipulation', duration: '120 min', completed },
      { id, title: 'Data Visualization', duration: '90 min', completed },
    ],
  },
  {
    id: '6',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, wireframing, and prototyping for web and mobile applications.',
    instructor: 'Emma Davis',
    category: 'Design',
    level: 'Beginner',
    price: 59.99,
    rating: 4.5,
    students,
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    lessons,
    reviews,
    description_long: 'Learn the fundamentals of UI/UX design. Create beautiful and functional user interfaces.',
    content: [
      { id, title: 'Design Principles', duration: '60 min', completed },
      { id, title: 'Wireframing', duration: '75 min', completed },
      { id, title: 'Prototyping with Figma', duration: '90 min', completed },
    ],
  },
];

export const SAMPLE_USER = {
  id: 'user-123',
  name: 'Jalal Chowdhury',
  email: 'jalalchowdhury47@gmail.com',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jalal',
  role: 'student',
  accountType: 'Student',
  memberSince: new Date('2024-01-15'),
  bio: 'Full-stack developer and tech enthusiast learning new technologies.',
  enrolledCourses: ['1', '2'],
  createdCourses: [],
  totalLearningHours,
  certificates,
};

export const SAMPLE_REVIEWS = [
  {
    id: 'review-1',
    courseId: '1',
    userId: 'user-456',
    userName: 'Alice Johnson',
    rating,
    review: 'Excellent course! Very comprehensive and well-structured. Highly recommend!',
    date: new Date('2024-11-01'),
  },
  {
    id: 'review-2',
    courseId: '1',
    userId: 'user-789',
    userName: 'Bob Smith',
    rating,
    review: 'Great content, but could use more real-world projects.',
    date: new Date('2024-10-28'),
  },
  {
    id: 'review-3',
    courseId: '1',
    userId: 'user-101',
    userName: 'Carol White',
    rating,
    review: 'Best web development course I\'ve taken! Life-changing.',
    date: new Date('2024-10-20'),
  },
];

export const SAMPLE_ENROLLMENTS = [
  {
    id: 'enroll-1',
    courseId: '1',
    userId: 'user-123',
    enrolledAt: new Date('2024-06-15'),
    progress,
    lastAccessedAt: new Date('2024-11-10'),
    completedLessons,
  },
  {
    id: 'enroll-2',
    courseId: '2',
    userId: 'user-123',
    enrolledAt: new Date('2024-08-20'),
    progress,
    lastAccessedAt: new Date('2024-11-09'),
    completedLessons,
  },
];

/**
 * Mock API function for getting courses
 */
export async function mockGetCourses(filter = null) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (filter === 'All') {
    return SAMPLE_COURSES;
  }
  
  if (filter) {
    return SAMPLE_COURSES.filter(course => course.category === filter);
  }
  
  return SAMPLE_COURSES;
}

/**
 * Mock API function for getting a single course
 */
export async function mockGetCourse(courseId) {
  await new Promise(resolve => setTimeout(resolve, 200));
  return SAMPLE_COURSES.find(course => course.id === courseId);
}

/**
 * Mock API function for getting course reviews
 */
export async function mockGetCourseReviews(courseId) {
  await new Promise(resolve => setTimeout(resolve, 250));
  return SAMPLE_REVIEWS.filter(review => review.courseId === courseId);
}

/**
 * Mock API function for enrolling in a course
 */
export async function mockEnrollCourse(courseId, userId) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    success,
    enrollmentId: `enroll-${Date.now()}`,
    message: 'Successfully enrolled in course',
  };
}

/**
 * Mock API function for getting user enrolled courses
 */
export async function mockGetEnrolledCourses(userId) {
  await new Promise(resolve => setTimeout(resolve, 300));
  return SAMPLE_ENROLLMENTS.filter(enroll => enroll.userId === userId);
}

/**
 * Mock API function for getting current user
 */
export async function mockGetCurrentUser() {
  await new Promise(resolve => setTimeout(resolve, 200));
  return SAMPLE_USER;
}

/**
 * Mock API function for updating user profile
 */
export async function mockUpdateUserProfile(userId, updates) {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    ...SAMPLE_USER,
    ...updates,
  };
}

export default {
  SAMPLE_COURSES,
  SAMPLE_USER,
  SAMPLE_REVIEWS,
  SAMPLE_ENROLLMENTS,
  COURSE_CATEGORIES,
  mockGetCourses,
  mockGetCourse,
  mockGetCourseReviews,
  mockEnrollCourse,
  mockGetEnrolledCourses,
  mockGetCurrentUser,
  mockUpdateUserProfile,
};

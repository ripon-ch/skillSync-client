# SkillSync - Online Learning Platform

A full-stack online learning platform where users can share courses, explore, enroll, and manage their learning activities.

**Live Site:** [https://skillsync.example.com](https://skillsync.example.com)

## Brand Name - SkillSync

**SkillSync** represents the core philosophy of our platform: *aligning skills perfectly with user goals*. We believe that effective learning is about synchronizing your skill development with your personal and professional aspirations, ensuring every course you take and every skill you build moves you closer to your objectives.

## Features

- 🎓 **Course Management**: Create, read, update, and delete courses with comprehensive details
- 👥 **User Authentication**: Secure email/password and Google OAuth authentication
- 📚 **Course Enrollment**: Explore courses and enroll in classes with instant access
- 🔍 **Smart Filtering**: Filter courses by category to find exactly what you're looking for
- 🌓 **Dark/Light Theme**: Toggle between dark and light modes for comfortable learning
- 📱 **Responsive Design**: Seamlessly works on mobile, tablet, and desktop devices
- ✨ **Animations**: Smooth Framer Motion animations enhance the user experience
- 🎯 **Instructor Dashboard**: Easy-to-use dashboard for instructors to manage courses
- 🔐 **Protected Routes**: Secure authentication ensures only authorized users access private pages

## Tech Stack

### Frontend
- **React 18** with React Router 6 (SPA mode)
- **JavaScript** (ES6+)
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Beautiful icon set
- **TanStack React Query** - Server state management
- **Firebase** - Authentication and storage

### Backend
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - Document database for storing courses and enrollments
- **Node.js** - JavaScript runtime

### Tools & Services
- **Firebase Authentication** - Email/Password and Google sign-in
- **MongoDB** - Database for courses and user enrollments
- **Vite** - Development server and build tool

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager
- MongoDB connection string
- Firebase credentials

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
# Create a .env file in the root directory with:
# VITE_FIREBASE_API_KEY=your_firebase_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# ... (other Firebase config)
# MONGODB_URI=your_mongodb_connection_string

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
├── client/                      # React frontend
│   ├── pages/                   # Route components
│   │   ├── Index.jsx           # Home page
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── AllCourses.jsx      # All courses with filtering
│   │   ├── CourseDetails.jsx   # Single course details
│   │   ├── Dashboard.jsx       # User dashboard
│   │   ├── AddCourse.jsx       # Create course page
│   │   ├── MyCourses.jsx       # Instructor's courses
│   │   ├── UpdateCourse.jsx    # Edit course page
│   │   └── MyEnrolledCourses.jsx # Student's enrolled courses
│   ├── components/              # Reusable components
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Footer
│   │   ├── CourseCard.jsx      # Course card component
│   │   ├── ProtectedRoute.jsx  # Protected route wrapper
│   │   └── LoadingSpinner.jsx  # Loading spinner
│   ├── context/                 # React context
│   │   ├── AuthContext.jsx     # Authentication context
│   │   └── ThemeContext.jsx    # Theme context
│   ├── lib/                     # Utilities and helpers
│   │   ├── firebase.js         # Firebase configuration
│   │   └── utils.js            # Utility functions
│   ├── App.jsx                 # App entry point
│   └── global.css              # Global styles
├── server/                      # Express backend
│   ├── routes/
│   │   ├── courses.js          # Course API routes
│   │   └── enrollments.js      # Enrollment API routes
│   ├── index.js                # Server setup
│   └── node-build.js           # Production server entry
├── shared/                      # Shared code
│   └── api.js                  # Shared API constants and types
└── package.json
```

## Key Features Explained

### Authentication Flow
1. Users can register with email, name, and password (with validation requirements)
2. Google OAuth integration for quick sign-up
3. Secure Firebase authentication with persistent sessions
4. Protected routes that redirect unauthenticated users to login

### Course Management
- **Browse Courses**: Filter courses by category on the All Courses page
- **Enroll**: Click "Enroll Now" to join a course
- **Instructor Features**: 
  - Create new courses with title, description, price, duration, and image URL
  - Edit existing course details
  - Delete courses from your dashboard
  - View all your created courses and enrollments

### Database Schema

**Courses Collection:**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  image: String,
  price: Number,
  duration: String,
  category: String,
  isFeatured: Boolean,
  instructor: String,
  instructorEmail: String,
  instructorImage: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Enrollments Collection:**
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,
  userEmail: String,
  enrolledAt: Date
}
```

## API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/courses/user/my-courses?email=user@email.com` - Get user's courses

### Enrollments
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/check/:courseId?email=user@email.com` - Check enrollment status
- `GET /api/enrollments/user/my-enrollments?email=user@email.com` - Get user's enrollments

## Development Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm test       # Run tests
pnpm typecheck  # Type checking
```

## Deployment

### Client-Side
- **Netlify**: Automatic deployments with CI/CD
- **Vercel**: Alternative deployment platform

### Server-Side
- **Vercel**: Serverless functions
- **Heroku**: Traditional hosting
- **Self-hosted**: Node.js server

## Error Handling

- Toast notifications for success and error messages
- Graceful error handling with user-friendly messages
- Loading spinners during async operations
- Custom 404 page for not found routes

## Performance Optimizations

- Code splitting with React Router
- Image optimization with placeholder URLs
- Efficient state management with React Context
- Debounced search and filter operations
- Lazy loading of course details

## Future Enhancements

- Course ratings and reviews with MongoDB aggregation
- Student progress tracking with charts
- Downloadable certificates for completed courses
- Video upload and streaming
- Discussion forums for each course
- Email notifications for enrollments
- Advanced search with full-text search
- Payment integration with Stripe

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue on GitHub or contact support at support@skillsync.com

---

Built with ❤️ for educators and learners worldwide

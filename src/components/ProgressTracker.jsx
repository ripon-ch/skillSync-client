import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import LoadingSpinner from './LoadingSpinner';

const COLORS = ['#fbbf24', '#4906BF', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];

export default function ProgressTracker() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEnrollmentsAndProgress();
    }
  }, [user]);

  const safeParse = async (response) => {
    if (!response) return {};
    if (response.bodyUsed) return {};
    try {
      const ct = response.headers.get('content-type') || '';
      if (ct.includes('application/json')) return await response.json();
      const text = await response.text();
      try {
        return text ? JSON.parse(text) : {};
      } catch {
        return {};
      }
    } catch (e) {
      console.error('Progress parse error:', e);
      return {};
    }
  };

  const fetchEnrollmentsAndProgress = async () => {
    setIsLoading(true);
    try {
      const enrollResponse = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(user.email)}`);
      const enrollData = await safeParse(enrollResponse);
      if (!enrollResponse.ok) {
        setEnrollments([]);
      } else {
        setEnrollments(Array.isArray(enrollData.enrollments) ? enrollData.enrollments : []);
      }

      const progressResponse = await fetch(`/api/progress/${user.uid}`);
      const progressData = await safeParse(progressResponse);
      if (!progressResponse.ok) {
        setProgress([]);
      } else {
        setProgress(Array.isArray(progressData.progress) ? progressData.progress : []);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
      toast.error('Failed to load progress data');
      setEnrollments([]);
      setProgress([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Prepare chart data
  const courseProgressData = enrollments.map((enrollment) => {
    const courseProgress = progress.find(p => p.courseId === enrollment.courseId) || {
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: 0
    };
    return {
      name: enrollment.courseName || 'Course',
      progress: courseProgress.progressPercent || 0,
      completed: courseProgress.lessonsCompleted || 0,
      total: courseProgress.totalLessons || 0
    };
  });

  const completedCourses = progress.filter(p => p.isCompleted).length;
  const inProgressCourses = enrollments.length - completedCourses;

  const progressDistribution = [
    { name: 'Completed', value: completedCourses, color: '#10b981' },
    { name: 'In Progress', value: inProgressCourses, color: '#fbbf24' }
  ];

  const averageProgress = enrollments.length > 0
    ? Math.round(courseProgressData.reduce((acc, cur) => acc + cur.progress, 0) / enrollments.length)
    : 0;

  return (
    <div
      style={{
        padding: '2rem',
        background: '#ffffff',
        borderRadius: '0.75rem',
        marginTop: '2rem'
      }}
    >
      <h2
        style={{
          fontSize: '1.75rem',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '2rem'
        }}
      >
        Your Learning Progress
      </h2>

      {enrollments.length === 0 ? (
        <div
          style={{
            padding: '3rem 2rem',
            background: '#f9fafb',
            borderRadius: '0.75rem',
            textAlign: 'center',
            color: '#6b7280'
          }}
        >
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
            No enrolled courses yet
          </p>
          <p>Enroll in a course to start tracking your progress.</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(34, 3, 89, 0.05), rgba(73, 6, 191, 0.05))',
                border: '1px solid rgba(94, 63, 222, 0.1)',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#4906BF',
                  marginBottom: '0.5rem'
                }}
              >
                {enrollments.length}
              </div>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Enrolled Courses
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#10b981',
                  marginBottom: '0.5rem'
                }}
              >
                {completedCourses}
              </div>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Completed Courses
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(217, 119, 6, 0.05))',
                border: '1px solid rgba(251, 191, 36, 0.1)',
                borderRadius: '0.75rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '0.5rem'
                }}
              >
                {averageProgress}%
              </div>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Average Progress
              </p>
            </div>
          </div>

          {/* Charts Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}
          >
            {/* Bar Chart - Course Progress */}
            <div
              style={{
                padding: '1.5rem',
                background: '#f9fafb',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}
              >
                Course Progress
              </h3>
              {courseProgressData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Bar dataKey="progress" fill="#4906BF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </div>

            {/* Pie Chart - Completion Status */}
            <div
              style={{
                padding: '1.5rem',
                background: '#f9fafb',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  alignSelf: 'flex-start'
                }}
              >
                Course Status
              </h3>
              {progressDistribution[0].value + progressDistribution[1].value > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={progressDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {progressDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : null}
            </div>
          </div>

          {/* Detailed Progress Table */}
          <div
            style={{
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              overflowX: 'auto'
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}
            >
              Detailed Progress
            </h3>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th
                    style={{
                      padding: '0.75rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      color: '#374151'
                    }}
                  >
                    Course Name
                  </th>
                  <th
                    style={{
                      padding: '0.75rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151'
                    }}
                  >
                    Progress
                  </th>
                  <th
                    style={{
                      padding: '0.75rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#374151'
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseProgressData.map((course, idx) => {
                  const courseProgress = progress.find(p => p.courseId === enrollments[idx]?.courseId);
                  const isCompleted = courseProgress?.isCompleted || false;
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td
                        style={{
                          padding: '0.75rem',
                          color: '#1f2937'
                        }}
                      >
                        {course.name}
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            maxWidth: '200px',
                            height: '8px',
                            background: '#e5e7eb',
                            borderRadius: '9999px',
                            overflow: 'hidden'
                          }}
                        >
                          <div
                            style={{
                              height: '100%',
                              background: 'linear-gradient(to right, #4906BF, #8b5cf6)',
                              width: `${course.progress}%`,
                              transition: 'width 0.3s ease'
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontWeight: '600',
                            color: '#1f2937',
                            minWidth: '50px',
                            textAlign: 'right'
                          }}
                        >
                          {course.progress}%
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '0.75rem',
                          textAlign: 'center'
                        }}
                      >
                        <span
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            background: isCompleted ? '#d1fae5' : '#fef3c7',
                            color: isCompleted ? '#065f46' : '#92400e'
                          }}
                        >
                          {isCompleted ? '✓ Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

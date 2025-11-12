import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  BookOpen,
  PlusCircle,
  UserCheck,
  BarChart3,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    myCourses: 0,
    enrolledCourses: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.warning("Please log in to access the dashboard");
      navigate("/login");
      return;
    }
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [myCoursesRes, enrolledRes, usersRes] = await Promise.all([
        fetch(`/api/courses/user/${user.email}`),
        fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(user.email)}`),
        fetch(`/api/users`),
      ]);

      const myCourses = myCoursesRes.ok ? await myCoursesRes.json() : [];
      const enrolledCourses = enrolledRes.ok ? await enrolledRes.json() : [];
      const users = usersRes.ok ? await usersRes.json() : [];

      setStats({
        myCourses: myCourses.length,
        enrolledCourses: enrolledCourses.length,
        totalUsers: users.length,
      });
    } catch (error) {
      console.error("Dashboard load failed:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-accent py-10 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome, {user?.name || "User"}!</h1>
        <p className="text-white/80">Your personal learning dashboard</p>
      </div>

      {/* Stats section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<BookOpen className="text-primary" />}
          title="My Created Courses"
          value={stats.myCourses}
          link="/my-courses"
        />
        <StatCard
          icon={<UserCheck className="text-green-600" />}
          title="My Enrolled Courses"
          value={stats.enrolledCourses}
          link="/my-enrolled-courses"
        />
        <StatCard
          icon={<BarChart3 className="text-accent" />}
          title="Total Users"
          value={stats.totalUsers}
        />
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/add-course"
            className="flex items-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:bg-primary/90 transition-all"
          >
            <PlusCircle size={18} />
            Add New Course
          </Link>

          <Link
            to="/my-courses"
            className="flex items-center gap-2 bg-muted text-foreground py-3 px-6 rounded-lg hover:bg-muted/80 transition-all"
          >
            <BookOpen size={18} />
            Manage My Courses
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-destructive text-white py-3 px-6 rounded-lg hover:bg-destructive/90 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, link }) {
  const content = (
    <div className="flex flex-col items-center justify-center bg-card border border-border rounded-2xl shadow-sm p-8 hover:shadow-md transition-all">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-primary">{value}</p>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}

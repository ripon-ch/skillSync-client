import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function HeaderMenu() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const location = useLocation();

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '/courses' },
    ...(user ? [{ label: 'My Courses', href: '/my-enrolled-courses' }] : []),
    { label: 'Dashboard', href: user ? '/dashboard' : '/login' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/courses') return location.pathname.startsWith('/courses') || location.pathname.startsWith('/course/');
    return location.pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex items-center gap-10">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`text-sm font-medium ${isActive(item.href) ? 'text-purple-600 border-b-2 border-purple-600' : isDark ? 'text-gray-300' : 'text-gray-700'} pb-1 hover:text-purple-500 transition-colors`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

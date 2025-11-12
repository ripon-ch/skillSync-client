import { Link } from 'react-router-dom';

export default function AuthButtons({ isMobile }) {
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'gap-4'}`}>
      <Link to="/login" className="px-4 py-2 border rounded-md text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-700">
        Login
      </Link>
      <Link to="/register" className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-semibold hover:bg-purple-700">
        Sign Up
      </Link>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useIsMobile } from '../../hooks/use-mobile';

import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';
import AuthButtons from './AuthButtons';
import ThemeToggle from '../components/ThemeToggle'; 
<ThemeToggle />

export default function Header() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className={`sticky top-0 z-50 ${isDark ? 'bg-slate-900 border-b border-slate-700' : 'bg-white border-b border-gray-200'}`}>
      <nav className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-purple-600 text-xl">SkillSync</Link>

        {/* Desktop Menu */}
        {!isMobile && <HeaderMenu />}

        {/* Right Side (Desktop) */}
        {!isMobile && (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? <ProfileMenu /> : <AuthButtons />}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}
      </nav>
    </header>
  );
}

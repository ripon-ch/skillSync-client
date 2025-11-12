import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import ProfileMenu from './ProfileMenu';
import AuthButtons from './AuthButtons';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function MobileMenu({ menuOpen, setMenuOpen }) {
  const { user } = useAuth();
  const { isDark } = useTheme();

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden p-2 text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className={`md:hidden p-4 ${isDark ? 'bg-slate-900 text-gray-300' : 'bg-white text-gray-700'}`}>
          <div className="flex flex-col gap-4">
            <HeaderMenu />
            <div className="mt-4 border-t pt-4 border-gray-300 dark:border-slate-700">
              <ThemeToggle />
              {user ? <ProfileMenu isMobile /> : <AuthButtons isMobile />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

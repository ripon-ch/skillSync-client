import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-1">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

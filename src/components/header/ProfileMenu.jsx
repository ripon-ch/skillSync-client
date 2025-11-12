import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import EditProfileModal from './EditProfileModal';

export default function ProfileMenu({ isMobile }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        <Avatar src={user?.photoURL} alt={user?.displayName} />
        {!isMobile && <span>{user?.displayName || 'Profile'}</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg p-2 flex flex-col gap-2 z-50">
          <button onClick={() => { setEditOpen(true); setOpen(false); }} className="text-sm">Edit Profile</button>
          <Link to="/dashboard" className="text-sm">Dashboard</Link>
          <button onClick={logout} className="text-sm text-red-500">Logout</button>
        </div>
      )}

      {editOpen && <EditProfileModal close={() => setEditOpen(false)} />}
    </div>
  );
}

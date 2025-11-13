import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useIsMobile } from '../hooks/use-mobile';
import { Moon, Sun, Menu, X, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { updateProfile, updateEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { uploadToImgbb } from '../lib/imgbb';

export default function Header() {
  const { user, logout, refreshUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  });
  const fileInputRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setForm({
      displayName: user?.displayName || '',
      email: user?.email || '',
      photoURL: user?.photoURL || ''
    });
  }, [user?.photoURL, user?.displayName, user?.email]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Home', href: '/', id: 'nav-home' },
    { label: 'Courses', href: '/courses', id: 'nav-courses' },
    ...(user ? [
      { label: 'My Courses', href: '/my-courses', id: 'nav-my-courses' }
    ] : []),
    { label: 'Dashboard', href: user ? '/dashboard' : '/login', id: 'nav-dashboard' },
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/courses') return location.pathname.startsWith('/courses') || location.pathname.startsWith('/course/');
    return location.pathname.startsWith(href);
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      setForm(prev => ({ ...prev, photoURL: url }));
      toast.success('Profile photo updated');
    } catch (err) {
      toast.error(err?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: form.displayName || '',
        photoURL: form.photoURL || ''
      });

      if (form.email && form.email !== auth.currentUser.email) {
        try {
          await updateEmail(auth.currentUser, form.email);
        } catch (err) {
          if (err?.code === 'auth/requires-recent-login') {
            toast.error('Please re-login to update your email');
          } else {
            toast.error(err?.message || 'Failed to update email');
          }
        }
      }
      
      refreshUser();
      toast.success('Profile updated');
      setEditOpen(false);
    } catch (err) {
      toast.error(err?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      await updateProfile(auth.currentUser, { photoURL: '' });
      setForm(prev => ({ ...prev, photoURL: '' }));
      refreshUser();
      toast.success('Profile photo removed');
    } catch (err) {
      toast.error(err?.message || 'Failed to remove photo');
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: isDark ? '#1a1a2e' : '#ffffff',
        borderBottom: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(0.75rem, 2vw, 1rem)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 2rem)'
        }}
      >
        {/* Logo/Brand */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            fontWeight: '800',
            fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
            color: '#5E3FDE',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          SkillSync
        </Link>

        {/* Desktop Navigation - Center */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              justifyContent: 'center'
            }}
          >
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: active ? '700' : '500',
                    color: active ? '#5E3FDE' : (isDark ? '#d0d0d0' : '#4b5563'),
                    borderBottom: active ? '2px solid #5E3FDE' : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = isDark ? '#ffffff' : '#6366f1';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = isDark ? '#d0d0d0' : '#4b5563';
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Side Actions */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexShrink: 0,
              justifyContent: 'flex-end'
            }}
          >
            {/* Search Icon */}
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isDark ? '#d0d0d0' : '#4b5563',
                padding: '0.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#ffffff' : '#6366f1'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#d0d0d0' : '#4b5563'}
            >
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isDark ? '#d0d0d0' : '#4b5563',
                padding: '0.5rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#ffffff' : '#6366f1'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#d0d0d0' : '#4b5563'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: isDark ? '#d0d0d0' : '#4b5563',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={user?.photoURL || `https://i.pravatar.cc/80?u=${encodeURIComponent(user?.email || 'user')}`}
                    alt={user?.displayName || 'Profile'}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`
                    }}
                    onError={(e) => {
                      e.currentTarget.src = `https://i.pravatar.cc/80?u=${encodeURIComponent(user?.email || 'user')}`;
                    }}
                  />
                  {user?.displayName || 'Profile'}
                </button>

                {profileOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '110%',
                      background: isDark ? '#0f0f1e' : '#ffffff',
                      border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      minWidth: '220px',
                      padding: '0.5rem',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                      zIndex: 100
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleProfilePhotoUpload}
                    />
                    <button
                      onClick={() => {
                        setEditOpen(true);
                        setProfileOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'transparent',
                        color: isDark ? '#d0d0d0' : '#4b5563',
                        border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      View & Edit Profile
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'transparent',
                        color: isDark ? '#d0d0d0' : '#4b5563',
                        border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem',
                        cursor: uploading ? 'not-allowed' : 'pointer',
                        opacity: uploading ? 0.6 : 1
                      }}
                      disabled={uploading}
                    >
                      {uploading ? 'Uploading…' : 'Upload Photo'}
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: 'transparent',
                        color: '#ef4444',
                        border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        marginBottom: '0.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      Remove Photo
                    </button>
                    <Link
                      to="/dashboard"
                      style={{
                        display: 'block',
                        padding: '0.5rem 0.75rem',
                        textDecoration: 'none',
                        color: isDark ? '#d0d0d0' : '#4b5563',
                        fontSize: '0.875rem',
                        borderRadius: '0.375rem',
                        marginBottom: '0.5rem',
                        textAlign: 'center',
                        border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`
                      }}
                      onClick={() => setProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        background: '#5E3FDE',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <Link
                  to="/login"
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: 'transparent',
                    color: isDark ? '#d0d0d0' : '#4b5563',
                    border: `1px solid ${isDark ? '#444' : '#e5e7eb'}`,
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? '#333' : '#f3f4f6';
                    e.currentTarget.style.color = isDark ? '#ffffff' : '#1a1a2e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = isDark ? '#d0d0d0' : '#4b5563';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: '0.5rem 1.5rem',
                    backgroundColor: '#5E3FDE',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4a2fa8')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5E3FDE')}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isDark ? '#d0d0d0' : '#4b5563',
              padding: '0.5rem'
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div
          style={{
            padding: '1rem',
            borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
            backgroundColor: isDark ? '#0f0f1e' : '#f9fafb'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {menuItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  style={{
                    textDecoration: 'none',
                    color: active ? '#5E3FDE' : (isDark ? '#d0d0d0' : '#4b5563'),
                    fontSize: '0.875rem',
                    fontWeight: active ? '700' : '500',
                    cursor: 'pointer',
                    padding: '0.5rem 0'
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${isDark ? '#333' : '#e5e7eb'}`
              }}
            >
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#5E3FDE',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: isDark ? '#d0d0d0' : '#4b5563',
                      border: `1px solid ${isDark ? '#444' : '#e5e7eb'}`,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      textAlign: 'center',
                      opacity: uploading ? 0.6 : 1
                    }}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : 'Upload Photo'}
                  </button>
                  <button
                    onClick={handleRemovePhoto}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      border: `1px solid ${isDark ? '#444' : '#e5e7eb'}`,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Remove Photo
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#5E3FDE',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: isDark ? '#d0d0d0' : '#4b5563',
                      border: `1px solid ${isDark ? '#444' : '#e5e7eb'}`,
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#5E3FDE',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {editOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.5)'
            }}
            onClick={() => setEditOpen(false)}
          />
          <div
            style={{
              position: 'relative',
              background: isDark ? '#0f0f1e' : '#ffffff',
              border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
              borderRadius: '0.75rem',
              padding: '1.5rem',
              width: '100%',
              maxWidth: '560px',
              margin: '0 1rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: isDark ? '#fff' : '#111827'
                }}
              >
                Edit Profile
              </h3>
              <button
                onClick={() => setEditOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isDark ? '#d0d0d0' : '#4b5563',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditProfileSubmit}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <img
                  src={form.photoURL || 'https://i.pravatar.cc/120'}
                  alt="Preview"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.pravatar.cc/120';
                  }}
                />
                <label
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    backgroundColor: isDark ? '#1a1a2e' : '#f9fafb',
                    color: isDark ? '#d0d0d0' : '#4b5563',
                    fontSize: '0.875rem'
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePhotoUpload}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: isDark ? '#d0d0d0' : '#6b7280',
                    marginBottom: '0.5rem'
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    background: isDark ? '#0f0f1e' : '#fff',
                    color: isDark ? '#fff' : '#111827',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: isDark ? '#d0d0d0' : '#6b7280',
                    marginBottom: '0.5rem'
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    background: isDark ? '#0f0f1e' : '#fff',
                    color: isDark ? '#fff' : '#111827',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box'
                  }}
                />
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: isDark ? '#9ca3af' : '#6b7280',
                    marginTop: '0.25rem'
                  }}
                >
                  Changing email may require recent login.
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  marginTop: '1.5rem'
                }}
              >
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#5E3FDE',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    flex: 1,
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'transparent',
                    border: `1px solid ${isDark ? '#333' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    color: isDark ? '#d0d0d0' : '#4b5563',
                    cursor: 'pointer',
                    flex: 1,
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}

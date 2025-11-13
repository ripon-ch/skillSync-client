import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen, Plus, Users, X, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { updateProfile, updateEmail } from 'firebase/auth';
import { uploadToImgbb } from '../lib/imgbb';
import { toast } from 'sonner';
import ProgressTracker from '../components/ProgressTracker';
import CertificatesDisplay from '../components/CertificatesDisplay';

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [accountType, setAccountType] = useState('Member');
  const [memberSince, setMemberSince] = useState('—');

  useEffect(() => {
    // Compute Member Since date
    const computeMemberSince = () => {
      try {
        const meta = auth.currentUser?.metadata;
        if (meta?.creationTime) {
          const joined = new Date(meta.creationTime);
          const label = joined.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
          setMemberSince(label);
        } else {
          setMemberSince('—');
        }
      } catch {
        setMemberSince('—');
      }
    };
    computeMemberSince();

    const computeAccountType = async () => {
      if (!user?.email) return;
      try {
        // Created courses count
        let created = 0;
        try {
          const res = await fetch(`/api/courses/user/my-courses?email=${encodeURIComponent(user.email)}`);
          if (res.ok) {
            const data = await res.json();
            created = Array.isArray(data) ? data.length : data.length;
          }
        } catch {}

        // Enrolled courses count (with localStorage fallback)
        let enrolled = 0;
        try {
          const res2 = await fetch(`/api/enrollments/user/my-enrollments?email=${encodeURIComponent(user.email)}`);
          if (res2.ok) {
            const data2 = await res2.json();
            if (Array.isArray(data2)) {
              enrolled = data2.length;
            } else if (Array.isArray(data2?.enrollments)) {
              enrolled = data2.enrollments.length;
            }
          }
        } catch {}
        if (enrolled === 0) {
          try {
            const key = `enrollments:${user.email}`;
            const localIds = JSON.parse(localStorage.getItem(key) || '[]');
            enrolled = Array.isArray(localIds) ? localIds.length : localIds.length;
          } catch {}
        }

        // Decide type: instructor if created>0, else student if enrolled>0, else Member
        if (created > 0) setAccountType('Instructor');
        else if (enrolled > 0) setAccountType('Student');
        else setAccountType('Member');
      } catch {}
    };
    computeAccountType();
  }, [user?.email, user?.uid]);

  const openProfile = () => {
    setForm({
      displayName: user?.displayName || '',
      email: user?.email || '',
      photoURL: user?.photoURL || ''
    });
    setProfileOpen(true);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToImgbb(file);
      setForm((f) => ({ ...f, photoURL: url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const saveProfile = async (e) => {
    e?.preventDefault?.();
    if (!auth.currentUser) return;
    setSaving(true);
    try {
      // Update display name / photo
      await updateProfile(auth.currentUser, {
        displayName: form.displayName || auth.currentUser.displayName || '',
        photoURL: form.photoURL || auth.currentUser.photoURL || ''
      });

      // Update email if changed
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

      toast.success('Profile updated');
      setProfileOpen(false);
      refreshUser();
    } catch (err) {
      toast.error(err?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const options = [
    {
      title: 'My Courses',
      description: 'View and manage the courses you have created',
      icon: BookOpen,
      href: '/my-courses',
      color: 'bg-blue-500',
    },
    {
      title: 'Add New Course',
      description: 'Create a new course and share your knowledge',
      icon: Plus,
      href: '/add-course',
      color: 'bg-green-500',
    },
    {
      title: 'My Enrolled Courses',
      description: 'View all courses you are currently enrolled in',
      icon: Users,
      href: '/my-enrolled-courses',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div style={{background: "linear-gradient(to right, #220359, #4906BF)", padding: "3rem 0"}}>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/90">Welcome back, {user?.displayName || 'User'}!</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.href}
                to={option.href}
                className="group bg-card border border-border rounded-lg p-8 hover:shadow-lg hover:border-primary transition-all"
              >
                <div className={`w-16 h-16 ${option.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{option.title}</h3>
                <p className="text-muted-foreground">{option.description}</p>
                <div className="mt-4 text-primary font-semibold group-hover:gap-2 transition-all">
                  Learn More →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button type="button" onClick={openProfile} className="text-left bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <p className="text-muted-foreground text-sm mb-1">Profile</p>
            <div className="flex items-center gap-4">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/80'}
                alt={user?.displayName || 'Profile'}
                className="w-12 h-12 rounded-full object-cover border border-border"
                onError={(e) => (e.currentTarget.src = 'https://i.pravatar.cc/80')}
              />
              <div>
                <p className="text-2xl font-bold text-foreground">{user?.displayName || 'N/A'}</p>
                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              </div>
            </div>
            <p className="text-primary font-semibold mt-3">View & Edit →</p>
          </button>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-1">Account Type</p>
            <p className="text-2xl font-bold text-foreground">{accountType}</p>
            <p className="text-sm text-muted-foreground mt-2">{accountType === 'Instructor' ? 'You can create and manage courses' : accountType === 'Student' ? 'You can enroll and learn from courses' : 'Explore courses and start learning'}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground text-sm mb-1">Member Since</p>
            <p className="text-2xl font-bold text-foreground">{memberSince}</p>
            <p className="text-sm text-muted-foreground mt-2">Welcome to SkillSync</p>
          </div>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker />

        {/* Certificates Display */}
        <CertificatesDisplay />
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setProfileOpen(false)} />
          <div className="relative bg-card border border-border rounded-lg p-6 w-full max-w-lg mx-4">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              onClick={() => setProfileOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-bold text-foreground mb-4">Edit Profile</h3>
            <form onSubmit={saveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={form.photoURL || 'https://i.pravatar.cc/120'}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border border-border"
                  onError={(e) => (e.currentTarget.src = 'https://i.pravatar.cc/120')}
                />
                <label className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg cursor-pointer text-sm font-medium">
                  <Upload size={16} /> {uploadingImage ? 'Uploading…' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files && e.target.files[0];
                      if (!file) return;
                      await handleUpload(file);
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your email"
                />
                <p className="text-xs text-muted-foreground mt-1">Changing email may require recent login.</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#5E3FDE',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) e.currentTarget.style.background = '#4a2fa8';
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) e.currentTarget.style.background = '#5E3FDE';
                  }}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="px-4 py-2 border border-border rounded-lg font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

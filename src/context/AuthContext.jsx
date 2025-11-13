import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInstructor, setIsInstructor] = useState(false);

  const checkIfInstructor = async (email) => {
    try {
      const response = await fetch(`/api/courses/user/my-courses?email=${encodeURIComponent(email)}`);
      const courses = await response.json();
      return Array.isArray(courses) && courses.length > 0;
    } catch (err) {
      console.error('Error checking instructor status:', err);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const instructorStatus = await checkIfInstructor(currentUser.email);
          if (isMounted) {
            setIsInstructor(instructorStatus);
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          }
        } else {
          if (isMounted) {
            setUser(null);
            setIsInstructor(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const refreshUser = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      });
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const uploadProfilePhoto = async (file) => {
    if (!auth.currentUser) throw new Error('Not authenticated');
    const fileExt = file.name.split('.').pop() || 'jpg';
    const path = `avatars/${auth.currentUser.uid}.${fileExt}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });
    const url = await getDownloadURL(storageRef);
    await updateProfile(auth.currentUser, { photoURL: url });
    refreshUser();
    return url;
  };

  const removeProfilePhoto = async () => {
    if (!auth.currentUser) throw new Error('Not authenticated');
    // Only clear the profile photo URL. Storage cleanup is optional and depends on bucket rules.
    await updateProfile(auth.currentUser, { photoURL: '' });
    refreshUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, uploadProfilePhoto, removeProfilePhoto, refreshUser, isInstructor }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

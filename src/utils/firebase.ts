/**
 * Firebase configuration and initialization.
 * Reads all config from Vite environment variables.
 * If credentials are missing, Firebase features gracefully degrade to mock mode.
 */

import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import type { Auth, User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export interface AppUser {
  name: string;
  email: string;
  photoURL: string | null;
  uid: string;
}

/**
 * Returns true if Firebase has valid configuration loaded from env.
 */
export const isFirebaseConfigured = (): boolean => isConfigured;

/**
 * Sign in with Google via popup.
 * Returns the user profile on success.
 */
export const signInWithGoogle = async (): Promise<AppUser> => {
  if (!auth) {
    throw new Error('Firebase is not configured. Add credentials to .env.');
  }

  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');

  const result = await signInWithPopup(auth, provider);
  const user: User = result.user;

  return {
    name: user.displayName || 'User',
    email: user.email || '',
    photoURL: user.photoURL,
    uid: user.uid,
  };
};

/**
 * Sign out the current user.
 */
export const firebaseSignOut = async (): Promise<void> => {
  if (auth) {
    await signOut(auth);
  }
};

/**
 * Get the current Firebase Auth instance (for onAuthStateChanged, etc.).
 */
export const getFirebaseAuth = (): Auth | null => auth;

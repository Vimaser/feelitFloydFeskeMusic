"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleAuthProvider } from '../../../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signInWithPopup } from 'firebase/auth';

const adminCredentials = {
  [process.env.NEXT_PUBLIC_ADMIN_EMAIL1]: process.env.NEXT_PUBLIC_ADMIN_UUID1,
  [process.env.NEXT_PUBLIC_ADMIN_EMAIL2]: process.env.NEXT_PUBLIC_ADMIN_UUID2,
};

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      console.log('Trying to log in with email and password');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in user:', userCredential.user);
      const user = userCredential.user;

      if (adminCredentials[email]) {
        const adminUUID = adminCredentials[email];
        console.log('Setting admin UUID:', adminUUID);
        await updateProfile(user, { displayName: adminUUID });
        console.log('Profile updated, redirecting to /admin/upload');
        router.push('/admin/upload');
      } else {
        setError('You do not have admin privileges.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      console.log('Trying to log in with Google');
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log('Signed in user:', result.user);
      const user = result.user;

      if (adminCredentials[user.email]) {
        const adminUUID = adminCredentials[user.email];
        console.log('Setting admin UUID:', adminUUID);
        await updateProfile(user, { displayName: adminUUID });
        console.log('Profile updated, redirecting to /admin/upload');
        router.push('/admin/upload');
      } else {
        setError('You do not have admin privileges.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in: ' + error.message);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    try {
      console.log('Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Error sending password reset email: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900">Admin Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login with Email
            </button>
          </div>
        </form>
        <div className="mt-8">
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Login with Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

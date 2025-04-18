'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Background from '../components/Background';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setError(data.message || 'Failed to create account');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  useEffect(() => {
    if (error) setError('');
  }, [name, email, password, confirmPassword, error]);

  return (
    <div className={`relative min-h-screen ${inter.className}`}>
      <Background />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className={`bg-black/30 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl shadow-indigo-500/50 w-[400px] md:w-[500px] border-2 border-purple-500/40 transform transition-transform ${shake ? 'animate-shake' : 'hover:scale-105'}`}
        >
          <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-4">Sign Up</h1>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="name" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-center animate-fade-in duration-300">{error}</p>
            )}

            <button
              type="submit"
              className="w-full p-4 mt-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-200">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:text-purple-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

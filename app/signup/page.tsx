'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Background from '../components/Background';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
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
      setMessage('This website is for only this Task Purpose I have not connected to any database "Thank you"');
    } else {
      setError(data.message || 'Signup failed');
    }
  };

  const handleInputChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="relative min-h-screen">
      <Background />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black/30 backdrop-blur-3xl p-8 rounded-3xl shadow-2xl shadow-green-500/40 w-[90%] sm:w-[400px] md:w-[450px] border-2 border-green-500/30 transform hover:scale-105 transition-transform">
          <h1 className="text-4xl font-extrabold text-center text-green-500 mb-6">Sign Up</h1>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={handleInputChange(setName)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30 text-gray-800 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange(setEmail)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30 text-gray-800 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleInputChange(setPassword)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30 text-gray-800 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/30 text-gray-800 ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  key="error-message"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="text-red-500 text-sm text-center -mt-4"
                >
                  {error}
                </motion.p>
              )}
              {message && (
                <motion.p
                  key="success-message"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                  className="text-green-500 text-sm text-center -mt-4"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-200">
            Already have an account?{' '}
            <a href="/login" className="text-green-500 hover:text-green-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

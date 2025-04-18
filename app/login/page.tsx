'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import Background from '../components/Background';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [showPasswordMessage, setShowPasswordMessage] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } else {
      setError(data.message || 'Invalid email or password');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  useEffect(() => {
    if (error) setError('');
  }, [email, password, error]); // Add error as a dependency

  return (
    <div className={`relative min-h-screen ${inter.className}`}>
      <Background />

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div
          className={`bg-black/30 backdrop-blur-3xl p-12 rounded-3xl shadow-2xl shadow-indigo-500/50 w-[500px] md:w-[600px] border-2 border-purple-500/40 transform transition-transform ${shake ? 'animate-shake' : 'hover:scale-105'}`}
        >
          <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6">Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div
              onMouseEnter={() => setShowEmailMessage(true)}
              onMouseLeave={() => setShowEmailMessage(false)}
            >
              <p
                className={`text-sm text-purple-400 mb-1 transition-all duration-300 ease-in-out ${showEmailMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
              >
                For tester admin email: <span className="font-semibold">admin@example.com</span>
              </p>
              <label htmlFor="email" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
            </div>

            <div
              onMouseEnter={() => setShowPasswordMessage(true)}
              onMouseLeave={() => setShowPasswordMessage(false)}
            >
              <p
                className={`text-sm text-purple-400 mb-1 transition-all duration-300 ease-in-out ${showPasswordMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
              >
                Admin password: <span className="font-semibold">password123</span>
              </p>
              <label htmlFor="password" className={`block text-lg font-medium ${error ? 'text-red-500' : 'text-gray-200'}`}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-4 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/30 text-gray-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
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
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-200">
            Don't have an account?{' '}
            <a href="/signup" className="text-purple-600 hover:text-purple-700">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Background from '../components/Background'; 

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]); // Add `router` here to fix the warning

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="relative min-h-screen overflow-hidden text-black">
      <Background />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-5xl p-8 rounded-2xl bg-white/40 backdrop-blur-xl shadow-lg border border-white/20">
          <h1 className="text-4xl font-bold mb-6">Welcome back, <span className="text-purple-700">Mohd Arshad 👋</span></h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-white/30">
              <h2 className="text-lg font-semibold text-purple-700">Total Users</h2>
              <p className="text-2xl font-bold mt-2">1,238</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-white/30">
              <h2 className="text-lg font-semibold text-purple-700">Messages</h2>
              <p className="text-2xl font-bold mt-2">548</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-md border border-white/30">
              <h2 className="text-lg font-semibold text-purple-700">New Signups</h2>
              <p className="text-2xl font-bold mt-2">42</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

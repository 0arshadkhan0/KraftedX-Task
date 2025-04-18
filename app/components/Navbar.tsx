'use client'; // Needed if you're using client-side features

import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 z-10 relative">
      <h1 className="text-white text-2xl font-bold">LIQWID</h1>
      <div className="flex items-center space-x-4">
        {/* Updated Link to /login */}
        <Link href="/login">
          <span className="text-white cursor-pointer">LOGIN</span>
        </Link>
        <a href="#" className="text-white">CAREERS</a>
        <button className="bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition">
          CONTACT US
        </button>
      </div>
    </div>
  );
}

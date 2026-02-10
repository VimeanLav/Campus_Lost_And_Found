'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter(); // ✅ inside component

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">

      {/* Header */}
      <div className="w-full flex items-center px-10 py-6">
        <h1 className="text-4xl flex-1 flex justify-center items-center font-bold">
          <span className="relative top-10">Campus Lost & Found</span>
        </h1>
      </div>

      {/* Card */}
      <div className="ml-4 mt-10 flex items-center justify-center">
        <div className="w-[380px] rounded-xl border shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Sign in
          </h2>
          <label className="text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          <div className="flex justify-between items-center">
            <label className="text-sm">Password</label>
            <span className="text-xs text-gray-400 cursor-pointer">
              Forgot?
            </span>
          </div>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          <div className="flex items-center gap-2 text-sm mb-4">
            <input type="checkbox" />
            <span>Remember me</span>
          </div>

          {/* 🔥 LOGIN BUTTON */}
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{' '}
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

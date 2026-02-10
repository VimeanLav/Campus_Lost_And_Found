'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="h-screenmin- flex flex-col items-center bg-white">
      {/* Header */}
      <div className="w-full flex items-center px-10 py-6">
        <h1 className="text-4xl flex-1 flex justify-center items-center font-bold">
          <span className="relative top-10">Campus Lost & Found</span>
        </h1>
      </div>

      {/* Card */}
      <div className="ml-4 mt-10  flex items-center justify-center">
        <div className="w-[380px] rounded-xl border shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>

          <label className="text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />
          <label className="text-sm">Username</label>
          <input
            type="email"
            placeholder="Enter your username"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
          />

          <label className="text-sm">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full border rounded-md px-3 py-2 mt-1 mb-6"
          />

          <button
            onClick={() => router.push('/verify')}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

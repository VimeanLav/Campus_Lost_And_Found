'use client';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();

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
            Verification
          </h2>

          <label className="text-sm">Code</label>
          <div className="flex gap-2 mt-1 mb-6">
            <input
              type="text"
              placeholder="Enter your code"
              className="flex-1 border rounded-md px-3 py-2"
            />
            <button className="text-xs text-gray-400">
              Send
            </button>
          </div>

          <button
            onClick={() => router.push('/login')}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      setSuccess("Email verified successfully! You can now login.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/home");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
          <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div className="flex justify-between items-center">
              <label className="text-sm">Password</label>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <div className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

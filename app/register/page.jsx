"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Success - redirect to verification page with email
      router.push(`/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <label className="text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-4"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

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

            <label className="text-sm">Password</label>
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

            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full border rounded-md px-3 py-2 mt-1 mb-6"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

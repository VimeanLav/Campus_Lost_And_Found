"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Verification failed");
        return;
      }

      setSuccess("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login?verified=true");
      }, 2000);
    } catch (err) {
      setError("An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError("");
    setSuccess("");
    setIsResending(true);

    try {
      const response = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to resend code");
        return;
      }

      setSuccess("Verification code sent! Check your email.");
    } catch (err) {
      setError("An error occurred while resending code");
    } finally {
      setIsResending(false);
    }
  };

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

          <p className="text-sm text-gray-600 mb-4 text-center">
            We've sent a 6-digit code to <strong>{email}</strong>
          </p>

          <form onSubmit={handleVerify}>
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

            <label className="text-sm">Verification Code</label>
            <div className="flex gap-2 mt-1 mb-6">
              <input
                type="text"
                placeholder="Enter 6-digit code"
                className="flex-1 border rounded-md px-3 py-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
              />
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                {isResending ? "Sending..." : "Resend"}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

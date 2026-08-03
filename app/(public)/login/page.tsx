"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Access denied.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white selection:bg-white selection:text-black">
      <div className="w-full max-w-sm">
        <div className="mb-12 flex flex-col items-center">
          <Lock className="text-neutral-500 mb-6" size={32} strokeWidth={1} />
          <h1 className="text-3xl font-bold tracking-tighter text-center">RESTRICTED<br/>ACCESS</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-950/50 border border-red-500/20 text-red-400 text-xs text-center uppercase tracking-widest font-mono">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Identification"
                required
                className="w-full bg-[#111] border border-white/5 p-4 text-sm focus:outline-none focus:border-white/20 transition-colors font-mono placeholder:text-neutral-600"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passphrase"
                required
                className="w-full bg-[#111] border border-white/5 p-4 text-sm focus:outline-none focus:border-white/20 transition-colors font-mono placeholder:text-neutral-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-between p-4 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Establish Link"}
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

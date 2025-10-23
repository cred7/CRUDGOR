"use client";
import { useEffect, useState } from "react";
type HomePageProps = {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HomePage({ setIsAuthenticated }: HomePageProps) {
  //   const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState();

  const [trues, setTrue] = useState(false);

  const checkAuth = async () => {
    const res = await fetch("/api/auth/verify", { credentials: "include" });
    const data = await res.json();
    setIsAuthenticated(data.authenticated);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const dd = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const l = await dd.json();
    console.log(l);
    if (!dd.ok) {
      setErr({ message: "session Expired" });
      setErr(l);
      setTimeout(() => {
        setTrue(false), setEmail(""), setErr(null), setPassword("");
      }, 3000);
      throw new Error("errprorororroro");
    }
    setIsAuthenticated(true);
    setTrue(false);
  };

  return (
    <div className=" items-center flex justify-center p-10 w-full h-full ">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl text-black font-semibold text-center">Login</h2>

        {err && (
          <h1
            className="
            text-black"
          >
            {err.message}
          </h1>
        )}

        <div className="flex flex-col">
          <label className="text-sm text-black font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-black font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

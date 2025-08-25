import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Seed admin user if not exists
  useEffect(() => {
    const seedAdmin = async () => {
      try {
        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";
        const { data } = await supabase
          .from("user")
          .select("id")
          .eq("email", adminEmail)
          .limit(1)
          .maybeSingle();

        if (!data) {
          await supabase.from("user").insert([
            {
              name: "Admin",
              email: adminEmail,
              password: adminPassword,
              balance: 0.0,
            },
          ]);
        }
      } catch (_) {
        // non-blocking
      }
    };
    seedAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Try to login with existing user
      const { data: existing, error: findErr } = await supabase
        .from("user")
        .select("id, name, email, password")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();

      if (findErr) throw findErr;

      if (existing) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: existing.id,
            name: existing.name,
            email: existing.email,
          })
        );
        setMessage("Login successful.");
        navigate("/dashboard");
        return;
      }

      // Remove create account logic
      setError("Invalid email or password.");
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-green-200 p-10">
        {/* Logo/Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-full p-3 mb-3 shadow">
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#3B82F6" />
              <path
                d="M10 18l6-6 6 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1">
            Sign in to your account
          </h1>
          <p className="text-sm text-green-600">
            Enter your email and password below
          </p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-sm text-green-800 bg-green-50 border border-green-200 rounded p-3">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Floating Label */}
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-lg border border-blue-200 px-4 py-3 text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-green-400 transition shadow-sm"
              required
              autoComplete="email"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-xs
                peer-focus:text-blue-700
                peer-focus:bg-white
                peer-focus:px-1
                peer-focus:translate-y-0
                peer-focus:font-semibold
                peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-blue-700
                peer-not-placeholder-shown:bg-white
                peer-not-placeholder-shown:px-1
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:font-semibold
              "
            >
              Email
            </label>
          </div>

          {/* Password Floating Label */}
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full rounded-lg border border-blue-200 px-4 py-3 text-gray-900 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-blue-400 transition shadow-sm"
              required
              autoComplete="current-password"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 bg-white px-1 transition-all duration-200 pointer-events-none
                peer-placeholder-shown:top-1/2
                peer-placeholder-shown:text-gray-400
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-xs
                peer-focus:text-green-700
                peer-focus:bg-white
                peer-focus:px-1
                peer-focus:translate-y-0
                peer-focus:font-semibold
                peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:text-xs
                peer-not-placeholder-shown:text-green-700
                peer-not-placeholder-shown:bg-white
                peer-not-placeholder-shown:px-1
                peer-not-placeholder-shown:translate-y-0
                peer-not-placeholder-shown:font-semibold
              "
            >
              Password
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div />
            <a
              href="#"
              className="text-xs text-blue-600 hover:underline transition"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-bold px-4 py-2 transition disabled:opacity-60 text-base shadow-lg"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} A&G Services. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;

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
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-green-200 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-blue-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-blue-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-green-400 transition"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-blue-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-blue-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-blue-400 transition"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white font-semibold px-4 py-2 transition disabled:opacity-60 text-base shadow"
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

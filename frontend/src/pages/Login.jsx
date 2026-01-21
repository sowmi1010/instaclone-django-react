import { useState, useContext } from "react";
import { api } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Lock, User } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await api.post("token/", form);

      login(res.data.access);
      localStorage.setItem("username", form.username);

      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_60%)]" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-black/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.35)] p-10 w-full max-w-md"
      >
        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          InstaClone
        </h1>

        {/* Username */}
        <div className="mb-5 relative">
          <User className="absolute left-3 top-3.5 text-purple-400" size={20} />
          <input
            name="username"
            placeholder="Username"
            className="w-full bg-black/60 border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-purple-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <Lock className="absolute left-3 top-3.5 text-purple-400" size={20} />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-black/60 border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-purple-500"
            onChange={handleChange}
            required
          />
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all duration-300 font-semibold text-white shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

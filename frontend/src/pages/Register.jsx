import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("register/", form);
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
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
          Create Account
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

        {/* Email */}
        <div className="mb-5 relative">
          <Mail className="absolute left-3 top-3.5 text-purple-400" size={20} />
          <input
            name="email"
            type="email"
            placeholder="Email"
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

        {/* Signup Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-all duration-300 font-semibold text-white shadow-lg"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Login */}
        <p className="text-center mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

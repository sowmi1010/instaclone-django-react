import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Home, PlusSquare, User } from "lucide-react";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-6xl mx-auto bg-black/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.35)]">

        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-black tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text"
          >
            InstaClone
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10 items-center text-gray-300">

            <Link to="/" className="flex items-center gap-2 group">
              <Home size={20} className="group-hover:text-purple-400 transition" />
              <span className="group-hover:text-purple-400 transition">Feed</span>
            </Link>

            <Link to="/create" className="flex items-center gap-2 group">
              <PlusSquare size={20} className="group-hover:text-purple-400 transition" />
              <span className="group-hover:text-purple-400 transition">Create</span>
            </Link>

            <Link to="/profile" className="flex items-center gap-2 group">
              <User size={20} className="group-hover:text-purple-400 transition" />
              <span className="group-hover:text-purple-400 transition">Profile</span>
            </Link>

            <button
              onClick={logout}
              className="relative px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-purple-400"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 space-y-5 text-gray-300">

            <Link onClick={() => setOpen(false)} to="/" className="flex items-center gap-3 hover:text-purple-400">
              <Home size={22} /> Feed
            </Link>

            <Link onClick={() => setOpen(false)} to="/create" className="flex items-center gap-3 hover:text-purple-400">
              <PlusSquare size={22} /> Create
            </Link>

            <Link onClick={() => setOpen(false)} to="/profile" className="flex items-center gap-3 hover:text-purple-400">
              <User size={22} /> Profile
            </Link>

            <button
              onClick={logout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg"
            >
              Logout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

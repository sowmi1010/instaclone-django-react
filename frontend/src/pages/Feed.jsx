import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { MapPin } from "lucide-react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    const url = city ? `posts/feed/?city=${city}` : "posts/feed/";
    api.get(url).then((res) => setPosts(res.data));
  }, [city]);

  const cities = ["All", "Chennai", "Bangalore", "Mumbai", "Hyderabad", "Delhi"];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_60%)]" />

      <Navbar />

      {/* Page Content */}
      <div className="relative pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* City Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">

            {cities.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c === "All" ? "" : c)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-300
                  ${
                    (c === "All" && city === "") || city === c
                      ? "bg-purple-600/30 border-purple-500 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                      : "bg-black/50 border-purple-500/20 text-gray-300 hover:border-purple-400"
                  }
                `}
              >
                <MapPin size={16} />
                {c}
              </button>
            ))}

          </div>

          {/* Feed */}
          <div className="space-y-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

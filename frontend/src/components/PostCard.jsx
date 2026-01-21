import { useState } from "react";
import { api } from "../api/axios";
import { Heart, Trash2, Send } from "lucide-react";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes_count);
  const [comment, setComment] = useState("");
  const [comments] = useState(post.comments || []);

  const loggedUser = localStorage.getItem("username");

  const handleLike = async () => {
    await api.post(`posts/like/${post.id}/`);
    setLikes((prev) => prev + 1);
  };

  const handleComment = async () => {
    if (!comment) return;
    await api.post(`posts/comment/${post.id}/`, { text: comment });
    window.location.reload();
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`posts/delete/${post.id}/`);
    window.location.reload();
  };

  const moodEmoji = {
    happy: "😄",
    sad: "😢",
    angry: "😡",
    stressed: "🤯",
    chill: "😎",
  };

  return (
    <div className="bg-black/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl mb-8 shadow-[0_0_40px_rgba(168,85,247,0.25)] overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-purple-500/20">
        <span className="font-semibold text-purple-300">{post.user}</span>

        {loggedUser === post.user && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
          >
            <Trash2 size={18} /> Delete
          </button>
        )}
      </div>

      {/* Image */}
      <img
        src={`http://127.0.0.1:8000${post.image}`}
        alt=""
        className="w-full max-h-[520px] object-cover"
      />

      {/* Content */}
      <div className="p-5 text-gray-200">

        <p className="mb-2">
          <span className="font-semibold text-purple-300">{post.user}</span>{" "}
          {post.caption}
        </p>

        <p className="text-sm text-gray-400 mb-3">
          Feeling:{" "}
          <span className="font-semibold capitalize text-purple-400">
            {moodEmoji[post.mood]} {post.mood}
          </span>
        </p>

        {/* Like */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-pink-500 hover:scale-110 transition"
          >
            <Heart fill="currentColor" /> {likes}
          </button>
        </div>

        {/* Comments */}
        <div className="space-y-2 mb-4">
          {comments.map((c) => (
            <p key={c.id} className="text-sm">
              <span className="font-semibold text-purple-300">{c.user}</span>{" "}
              {c.text}
              <span className="text-gray-500 text-xs ml-2">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </p>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-black/60 border border-purple-500/20 rounded-xl px-4 py-2 outline-none focus:border-purple-500"
          />

          <button
            onClick={handleComment}
            className="px-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition text-white"
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

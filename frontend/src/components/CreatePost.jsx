import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus, UploadCloud } from "lucide-react";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [mood, setMood] = useState("happy");
  const [city, setCity] = useState("Chennai");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("mood", mood);
    formData.append("city", city);

    try {
      setLoading(true);
      await api.post("posts/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-black/70 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.35)] p-8">

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Image Upload */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500/30 rounded-xl p-6 cursor-pointer hover:border-purple-500 transition">
            {preview ? (
              <img src={preview} alt="" className="rounded-lg max-h-64 object-cover" />
            ) : (
              <div className="text-center text-gray-400">
                <ImagePlus size={40} className="mx-auto mb-2 text-purple-400" />
                <p>Click to upload image</p>
              </div>
            )}
            <input type="file" hidden accept="image/*" onChange={handleImage} />
          </label>

          {/* Mood */}
          <select
            className="w-full bg-black/60 border border-purple-500/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="happy">😄 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😡 Angry</option>
            <option value="stressed">🤯 Stressed</option>
            <option value="chill">😎 Chill</option>
          </select>

          {/* City */}
          <select
            className="w-full bg-black/60 border border-purple-500/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Chennai</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Hyderabad</option>
            <option>Delhi</option>
          </select>

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            className="w-full bg-black/60 border border-purple-500/20 rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
            rows="3"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition font-semibold text-white shadow-lg"
          >
            <UploadCloud size={20} />
            {loading ? "Uploading..." : "Post Now"}
          </button>

        </form>
      </div>
    </div>
  );
}

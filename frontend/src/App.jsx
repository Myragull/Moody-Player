import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Playlist from "./components/Playlist";
import API from "./Api"; // ✅ axios instance

function App() {
  const [mood, setMood] = useState("");         // 🎯 state from detection
  const [songs, setSongs] = useState([]);       // 🎯 fetched songs

  // 🔁 Fetch songs when mood changes
  useEffect(() => {
    const fetchSongs = async () => {
      if (!mood) return;

      try {
        const res = await API.get(`/songs/?mood=${mood}`);
        setSongs(res.data); // ✅ set songs from backend
      } catch (err) {
        console.error("Failed to fetch songs:", err);
      }
    };

    fetchSongs();
  }, [mood]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Hero setMood={setMood} /> {/* 📤 pass setter */}
      <Playlist songs={songs} /> {/* 📥 pass songs */}
    </div>
  );
}

export default App;

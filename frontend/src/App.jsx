import { useState } from "react";
import Nav from "./components/nav";
import Hero from "./components/Hero";
import DetectedEmotion from "./components/DetectedEmotion";

function App() {
  const [mood, setMood] = useState("");

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-6 mt-4 border border-amber-500 mb-10">
        <Hero setMood={setMood} />
        <DetectedEmotion mood={mood} />
      </div>
    </>
  );
}

export default App;

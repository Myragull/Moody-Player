// DetectionPanel.jsx
export default function DetectionPanel({ onDetect, mood }) {
  return (
    <div className=" mt-2">
      <h3 className="font-bold mb-2">Live Mood Detection</h3>
      <p>
        Your current mood is being analyzed in real-time. Enjoy music tailored
        to your feelings.
      </p>
      <button
        onClick={onDetect}
        className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded text-white mt-4"
      >
        Start Detecting
      </button>

      {mood && <p className="mt-4">Detected Mood: {mood}</p>}
    </div>
  );
}

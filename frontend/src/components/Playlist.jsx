import SongItem from "./SongItem";

function Playlist({ songs }) {
  if (!songs?.length) {
    return <p className="text-gray-500">No songs found for this mood.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-bold">Recommended Songs</h3>
      {songs.map((song) => (
        <SongItem key={song._id} song={song} />
      ))}
    </div>
  );
}

export default Playlist;
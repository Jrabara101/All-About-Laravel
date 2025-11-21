import { Song } from "../types";
import { LikeToggle } from "./LikeToggle";
import { Dispatch, SetStateAction } from "react";

export function SongList({
  searchQuery,
  songs,
  currentUserId,
  setSongs,
}: {
  searchQuery: string;
  songs: Song[];
  currentUserId: number;
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  // toggle likedBy local function
  const handleToggleLiked = (id: number) => {
    setSongs(
      songs.map((song) =>
        song.id === id
          ? {
              ...song,
              likedBy: song.likedBy.includes(currentUserId)
                ? song.likedBy.filter((uid) => uid !== currentUserId)
                : [...song.likedBy, currentUserId],
            }
          : song
      )
    );
  };

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {songs
        .filter((song) =>
          song.trait.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((song) => (
          <li
            key={song.id}
            className="overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5"
          >
            <img
              className="aspect-square object-cover"
              alt={song.name}
              src={song.imageUrl}
            />
            <div className="gap flex items-center justify-between p-4 text-sm">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{song.name}</p>
                <span className="text-slate-300">·</span>
                <p className="text-slate-500">{song.trait}</p>
              </div>
              <LikeToggle
                song={song}
                onToggle={handleToggleLiked}
                currentUserId={currentUserId}
              />
            </div>
          </li>
        ))}
    </ul>
  );
}

import { Dispatch, SetStateAction } from "react";
import { type Song } from "../types";
import { LikeToggle } from "./LikeToggle";

export function SongList({
  searchQuery,
  songs,
  setSongs,
}: {
  searchQuery: string;
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {songs
        .filter((song) =>
          song.trait.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .map((song) => (
          <SongCard key={song.id} song={song} setSongs={setSongs} />
        ))}
    </ul>
  );
}

type SongCardProps = {
  song: Song;
  setSongs: Dispatch<SetStateAction<Song[]>>;
};

function SongCard({ song, setSongs }: SongCardProps) {
  return (
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
        <LikeToggle song={song} setSongs={setSongs} />
      </div>
    </li>
  );
}

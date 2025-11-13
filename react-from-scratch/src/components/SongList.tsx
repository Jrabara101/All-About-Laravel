import { type song } from "../types";
import { LikeToggle } from "./LikeToggle";
import { Dispatch, SetStateAction } from "react";

export function SongList({
  song,
  liked,
  setLiked,
}: {
  song: song[];
  liked: song["id"][];
  setLiked: Dispatch<SetStateAction<song["id"][]>>;
}) {

  return (
    <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {song.map((song) => (
         <SongCard
          key={song.id}
          song={song}
          liked={liked}
          setLiked={setLiked}
        />
      ))}
    </ul>
  );
}

type SongCardProps = {
  song: song;
  liked: song["id"][];
  setLiked: Dispatch<SetStateAction<song["id"][]>>;
};

function SongCard({ song, liked, setLiked }: SongCardProps) {
  return (
    <li
      key={song.id}
      className="overflow-clip rounded-lg bg-white shadow-md ring ring-black/5 hover:-translate-y-0.5"
    >
      <img
        className="aspect-square object-cover"
        alt={song.name}
        src={song.imagePath}
      />
      <div className="gap flex items-center justify-between p-4 text-sm">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{song.name}</p>
          <span className="text-slate-300">·</span>
          <p className="text-slate-500">{song.vibe}</p>
        </div>
          <LikeToggle id={song.id} liked={liked} setLiked={setLiked} />
      </div>
    </li>
  );
}

import { Song } from "../types";
import { Heart, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function Shortlist({
  songs,
  currentUserId,
  setSongs,
}: {
  songs: Song[];
  currentUserId: number;
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your shortlist</span>
        <Heart className="fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {songs
          .filter((song) => song.likedBy.includes(currentUserId))
          .map((song) => (
            <li
              key={song.id}
              className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5"
            >
              <img
                height={32}
                width={32}
                alt={song.name}
                className="aspect-square w-8 object-cover"
                src={song.imageUrl}
              />
              <p className="px-3 text-sm text-slate-800">{song.name}</p>
              <button
                onClick={() =>
                  setSongs(
                    songs.map((s) =>
                      s.id === song.id
                        ? {
                            ...s,
                            likedBy: s.likedBy.filter((uid) => uid !== currentUserId),
                          }
                        : s
                    )
                  )
                }
                className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
              >
                <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

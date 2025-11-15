import { song } from "../types";
import { Heart, X } from "lucide-react";
import { useLiked } from "../context";


export function Shortlist({ song }: { song: song[] }) {
  const { liked, setLiked } = useLiked();

  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your shortlist</span>
        <Heart className="fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {song
          .filter((song) => liked.includes(song.id))
          .map((song) => (
            <li
              key={song.id}
              className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0"
            >
              <img
                height={32}
                width={32}
                alt={song.name}
                className="aspect-square w-8 object-cover"
                src={song.imagePath}
              />
              <p className="px-3 text-sm text-slate-800">{song.name}</p>
              <button
                onClick={() => setLiked(liked.filter((id) => id !== song.id))}
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

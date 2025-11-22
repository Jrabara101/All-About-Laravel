import { Song } from "../types";
import { Heart, X, LoaderCircle } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { unlikeSong } from "../queries";

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
              <DeleteButton
                id={song.id}
                currentUserId={currentUserId}
                setSongs={setSongs}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

function DeleteButton({
  id,
  currentUserId,
  setSongs,
}: {
  id: Song["id"];
  currentUserId: number;
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      onClick={async () => {
        setPending(true);
        try {
          // Call backend to unlike song
          const updatedSong = await unlikeSong(id, currentUserId);
          // Update local state with returned data
          setSongs((prevSongs) =>
            prevSongs.map((s) =>
              s.id === updatedSong.id ? updatedSong : s
            )
          );
        } catch (error) {
          console.error("Failed to unlike:", error);
        } finally {
          setPending(false);
        }
      }}
      disabled={pending}
      className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100 disabled:cursor-not-allowed"
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin stroke-slate-300" />
      ) : (
        <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
      )}
    </button>
  );
}

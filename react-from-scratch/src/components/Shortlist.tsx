import { Dispatch, SetStateAction, useState } from "react";
import { Song } from "../types";
import { Heart, LoaderCircle, X } from "lucide-react";
import { toggleLikedStatus } from "../queries";

export function Shortlist({
  songs,
  setSongs,
}: {
  songs: Song[];
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
          .filter((song) => song.likedBy.includes(1))
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
                src={song.imageUrl}
              />
              <p className="px-3 text-sm text-slate-800">{song.name}</p>
              <DeleteButton id={song.id} setSongs={setSongs} />
            </li>
          ))}
      </ul>
    </div>
  );
}

function DeleteButton({
  id,
  setSongs,
}: {
  id: Song["id"];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  const [pending, setPending] = useState(false);
  return (
    <button
      onClick={async () => {
        setPending(true);
        const updatedSong = await toggleLikedStatus(id);
        setSongs((prevSongs) => {
          return prevSongs.map((existingSong) =>
            existingSong.id === updatedSong.id ? updatedSong : existingSong,
          );
        });
        setPending(false);
      }}
      className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin stroke-slate-300" />
      ) : (
        <X className="size-4 stroke-slate-400 group-hover:stroke-red-400" />
      )}
    </button>
  );
}

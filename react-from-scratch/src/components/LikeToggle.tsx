import { Dispatch, SetStateAction, useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { Song } from "../types";
import { toggleLikedStatus } from "../queries";

export function LikeToggle({
  song,
  setSongs,
}: {
  song: Song;
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  const [pending, setPending] = useState(false);
  return (
    <button
      className="group"
      onClick={async () => {
        setPending(true);
        const updatedSong = await toggleLikedStatus(song.id);
        setSongs((prevSongs) => {
          return prevSongs.map((existingSong) =>
            existingSong.id === updatedSong.id ? updatedSong : existingSong,
          );
        });
        setPending(false);
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            song.likedBy.includes(1)
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      )}
    </button>
  );
}

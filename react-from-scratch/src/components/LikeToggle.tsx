import { Heart, LoaderCircle } from "lucide-react";
import { Song } from "../types";
import { useState } from "react";
import { toggleLikedStatus } from "../queries";
import { Dispatch, SetStateAction } from "react";

export function LikeToggle({
  song,
  currentUserId,
  setSongs,
}: {
  song: Song;
  currentUserId: number;
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  const [pending, setPending] = useState(false);
  const liked = song.likedBy.includes(currentUserId);

  return (
    <button
      className="group"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          // Call backend to toggle like status
          const updatedSong = await toggleLikedStatus(song.id, currentUserId);
          // Update local state with returned data from backend
          setSongs((prevSongs) =>
            prevSongs.map((existingSong) =>
              existingSong.id === updatedSong.id ? updatedSong : existingSong
            )
          );
        } catch (error) {
          console.error("Failed to toggle like:", error);
        } finally {
          setPending(false);
        }
      }}
    >
      {pending ? (
        <LoaderCircle className="animate-spin stroke-slate-300" />
      ) : (
        <Heart
          className={
            liked
              ? "fill-pink-500 stroke-none"
              : "stroke-slate-200 group-hover:stroke-slate-300"
          }
        />
      )}
    </button>
  );
}

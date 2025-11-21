import { Heart, LoaderCircle } from "lucide-react";
import { Song } from "../types";
import { useState } from "react";

export function LikeToggle({
  song,
  onToggle,
  currentUserId,
}: {
  song: Song;
  onToggle: (id: number) => void;
  currentUserId: number;
}) {
  const [pending, setPending] = useState(false);
  const liked = song.likedBy.includes(currentUserId);

  return (
    <button
      className="group"
      onClick={() => {
        setPending(true);
        setTimeout(() => {
          onToggle(song.id);
          setPending(false);
        }, 500); // Faster feedback
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

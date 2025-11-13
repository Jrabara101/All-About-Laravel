import { Heart } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { song } from "../types";

export function LikeToggle({
  id,
  liked,
  setLiked,
}: {
  id: song["id"];
  liked: song["id"][];
  setLiked: Dispatch<SetStateAction<song["id"][]>>;
}) {

  return (
    <button
      className="group"
      onClick={() => {
        if (liked.includes(id)) {
          setLiked(liked.filter((pupId) => pupId !== id));
        } else {
          setLiked([...liked, id]);
        }
      }}
    >
      <Heart
        className={
                 liked.includes(id)
            ? "fill-pink-500 stroke-none"
            : "stroke-slate-200 group-hover:stroke-slate-300"
        }
      />
    </button>
  );
}
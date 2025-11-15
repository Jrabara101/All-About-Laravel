import { Heart } from "lucide-react";
import { useLiked } from "../context";
import { song } from "../types";

export function LikeToggle({ id }: { id: song["id"] }) {
  const { liked, setLiked } = useLiked();
  return (
    <button
      className="group"
      onClick={() => {
        if (liked.includes(id)) {
          setLiked(liked.filter((songid) => songid !== id));
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
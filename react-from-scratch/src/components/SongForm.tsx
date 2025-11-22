import { Dispatch, SetStateAction, useState } from "react";
import { Song } from "../types";
import { addSong } from "../queries";

const imageFiles = [
  "Alisson.jpg",
  "Bruno.jpg",
  "Bruno1.jpg",
  "Dionela.jpg",
  "Frank.jpg",
  "Harry.jpg",
];

export function SongForm({
  songs,
  setSongs,
  currentUserId,
}: {
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
  currentUserId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const newSongData = {
            name: formData.get("name") as string,
            trait: formData.get("trait") as string,
            imageUrl: `/images/${
              imageFiles[Math.floor(Math.random() * imageFiles.length)]
            }`,
          };

          setIsLoading(true);
          setError(null);

          try {
            // Call backend to create song
            const createdSong = await addSong(newSongData);
            // Add to local state
            setSongs([...songs, createdSong]);
            // Reset form
            e.currentTarget.reset();
          } catch (err: any) {
            console.error("Failed to add song:", err);
            setError(err.message || "Failed to add song");
          } finally {
            setIsLoading(false);
          }
        }}
        className="mt-4 flex w-full flex-col items-start gap-4"
      >
        <div className="grid w-full gap-6 md:grid-cols-3">
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="name">Artist Name</label>
            <input
              required
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="name"
              type="text"
              name="name"
            />
          </fieldset>
          <fieldset className="flex w-full flex-col gap-1">
            <label htmlFor="trait">Song Name</label>
            <input
              required
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="trait"
              type="text"
              name="trait"
            />
          </fieldset>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
        >
          {isLoading ? "Adding song..." : "Add song"}
        </button>
      </form>
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";
import { Song } from "../types";

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
}: {
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
}) {
  return (
    <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const newSong: Song = {
            id: songs.length + 1,
            name: formData.get("name") as string,
            trait: formData.get("trait") as string,
            imageUrl: `/images/${
              imageFiles[Math.floor(Math.random() * imageFiles.length)]
            }`,
            likedBy: [],
          };
          setSongs([...songs, newSong]);
          e.currentTarget.reset();
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
        <button
          type="submit"
          className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
        >
          Add song
        </button>
      </form>
    </div>
  );
}

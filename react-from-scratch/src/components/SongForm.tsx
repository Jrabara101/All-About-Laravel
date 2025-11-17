import { Dispatch, SetStateAction } from "react";
import { song } from "../types";
import { useFormStatus } from "react-dom";

const imageFiles = [
 "Alisson.jpg",
 "Bruno.jpg",
 "Bruno1.jpg",
 "Dionela.jpg",
 "Frank.jpg",
 "generated-image.png",
 "Harry.jpg",
 "Kendrick.jpg",
 "logo.png",
 "Olivia Rodrigo.jpg",
 "Sabrina.jpg",
 "Starboy.jpg",
 "SZA.jpg"
];

export function SongForm({
  songs,
  setSongs,
}: {
  songs: song[];
  setSongs: Dispatch<SetStateAction<song[]>>;
}) {
 // Local state for the selected image



 return (
  <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
   <form
    action={async (formData: FormData) => {
          // simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const newSong: song = {
            id: songs.length + 1,
            name: formData.get("name") as string,
            vibe: formData.get("vibe") as string,
            imagePath: `/images/${imageFiles[Math.floor(Math.random() * imageFiles.length)]}`,
          };

          setSongs([...songs, newSong]);
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
          <fieldset
            disabled
            className="col-span-2 flex w-full cursor-not-allowed flex-col gap-1 opacity-50"
          >
            <label htmlFor="avatar_url">Profile pic</label>
            <input
              className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              id="avatar_url"
              type="file"
              name="avatar_url"
            />
          </fieldset>
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return (
    <button
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
      type="submit"
      disabled={status.pending}
    >
      {status.pending
        ? `Adding ${status?.data?.get("name") || "song"}...`
        : "Add song"}
    </button>
  );
}

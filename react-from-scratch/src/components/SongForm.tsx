import { Dispatch, SetStateAction, useState } from "react";
import { song } from "../types";

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
 const [selectedImage, setSelectedImage] = useState(imageFiles[0]);

 function addsong(formData: FormData) {
  const newsong: song = {
   id: songs.length + 1,
name: formData.get("name") as string,
   vibe: formData.get("trait") as string,
   imagePath: `/images/${formData.get("imageFile")}`
 };
 setSongs((prev) => [...prev, newsong]);
 }
 return (
  <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
   <form
    action={addsong}
    className="mt-4 flex w-full flex-col items-start gap-4"
   >
    <div className="grid w-full gap-6 md:grid-cols-3">
     <fieldset className="flex w-full flex-col gap-1">
      <label htmlFor="name">Artist Name</label>
      <input
       className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
       id="name"
       type="text"
       name="name"
      />
     </fieldset>
     <fieldset className="flex w-full flex-col gap-1">
      <label htmlFor="trait">Song Name</label>
      <input
       className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
       id="trait"
       type="text"
       name="trait"
      />
     </fieldset>
     <fieldset className="flex w-full flex-col gap-1">
      <label htmlFor="imageFile">Profile Pic</label>
      <select
       id="imageFile"
       name="imageFile"
       value={selectedImage}
       onChange={(e) => setSelectedImage(e.target.value)}
      >
       {imageFiles.map(img => (
        <option key={img} value={img}>{img}</option>
       ))}
      </select>
     </fieldset>
    </div>
    <button
     className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
     type="submit"
    >
     Add song
    </button>
   </form>
  </div>
 );
}

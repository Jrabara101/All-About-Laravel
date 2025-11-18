import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";

import { LikedContext } from "./context";
import { songs as songsData} from "./data/songs";
import { useEffect, useState } from "react";
import { song } from "./types";
import { LoaderCircle } from "lucide-react";

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <Main />
      </Container>
    </PageWrapper>
  );
}

function Main() {
    const [liked, setLiked] = useState<song["id"][]>([1, 3]);
    const [searchQuery, setSearchQuery] = useState("");
     const [song, setsong] = useState<song[]>(songsData);

  return (
    <LikedContext value={{ liked, setLiked }}>
      <main>
         <ApiSongs />
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
           <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Shortlist song={song} />
        </div>
        <SongList 
          song={song}
          liked={liked}
          setLiked={setLiked}
          searchQuery={searchQuery}
      />
        <SongForm songs={song} setSongs={setsong}/>
      </main>
    </LikedContext>
  );
}

function ApiSongs() {
  const [apiSongs, setApiSongs] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function getSongs() {
      setIsLoading(true);
      try {
        const response = await fetch("http://react-backend.test/api/Songs");
        if (!response.ok) {
          const errorData = await response.json();
          setError(`${errorData.message}: ${errorData.details}`);
          throw errorData;
        }
        const data = await response.json();
        setApiSongs(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    getSongs();
  }, []);
  return (
    <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
      {isLoading && <LoaderCircle className="animate-spin stroke-slate-300" />}
      {apiSongs.length > 0 && (
        <pre>{JSON.stringify(apiSongs, null, 2)}</pre>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

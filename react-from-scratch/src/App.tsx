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
  const [apiSongs, setApiSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    async function getSongs() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:8000/api/songs", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
            if (errorData.errors) {
              errorMessage += ` - ${JSON.stringify(errorData.errors)}`;
            }
          } catch (e) {
            // If response is not JSON, use status text
            errorMessage = response.statusText || errorMessage;
          }
          setError(errorMessage);
          return;
        }
        const data = await response.json();
        setApiSongs(Array.isArray(data) ? data : []);
      } catch (error: any) {
        console.error("API Error:", error);
        setError(error.message || "Failed to fetch songs. Please check if the API server is running.");
      } finally {
        setIsLoading(false);
      }
    }

    getSongs();
  }, []);
  return (
    <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
      <h2 className="mb-4 text-xl font-semibold">API Songs</h2>
      {isLoading && <LoaderCircle className="animate-spin stroke-slate-300" />}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && apiSongs.length === 0 && (
        <p className="text-gray-500">No songs found in the database.</p>
      )}
      {apiSongs.length > 0 && (
        <pre className="overflow-auto">{JSON.stringify(apiSongs, null, 2)}</pre>
      )}
    </div>
  );
}

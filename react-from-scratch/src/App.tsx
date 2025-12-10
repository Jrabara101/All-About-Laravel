import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";
import { getSongs } from "./queries";
import { Song } from "./types";
import { ErrorBoundary } from "react-error-boundary";
import { LoaderCircle } from "lucide-react";
import { Suspense, use, useState } from "react";

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className="mt-12 bg-red-100 p-6 shadow ring ring-black/5">
              <p className="text-red-500 font-semibold">Error loading songs:</p>
              <p className="text-red-600 mt-2">{error.message}</p>
              <p className="text-sm text-gray-600 mt-4">
                Make sure the Laravel API server is running at http://react-backend.test/react-from-scratch-api
              </p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="mt-12 grid h-48 place-items-center">
                <LoaderCircle className="animate-spin stroke-slate-300" />
              </div>
            }
          >
            <Main />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </PageWrapper>
  );
}

const songPromise = getSongs();

function Main() {
  const apiSongs = use(songPromise);
  const [songs, setSongs] = useState<Song[]>(apiSongs);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Shortlist songs={songs} setSongs={setSongs} />
      </div>
      <SongList
        songs={songs}
        searchQuery={searchQuery}
        setSongs={setSongs}
      />
      <SongForm songs={songs} setSongs={setSongs} />
    </main>
  );
}

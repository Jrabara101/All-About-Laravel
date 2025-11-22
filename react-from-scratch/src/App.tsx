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
              <p className="text-red-500">
                {error.message}: {error.details}
              </p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="mt-12 bg-white p-6 shadow ring ring-black/5">
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
  const currentUserId = 1; // Set from context/auth later

  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Shortlist songs={songs} currentUserId={currentUserId} setSongs={setSongs} />
      </div>
      <SongList
        songs={songs}
        currentUserId={currentUserId}
        searchQuery={searchQuery}
        setSongs={setSongs}
      />
      <SongForm songs={songs} setSongs={setSongs} currentUserId={currentUserId} />
    </main>
  );
}

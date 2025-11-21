import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";
import { songs as songsData } from "./data/songs";
import { useState } from "react";
import { Song } from "./types";

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
  const [songs, setSongs] = useState<Song[]>(songsData);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserId = 1; // You can set this from context/auth

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
      <SongForm songs={songs} setSongs={setSongs} />
    </main>
  );
}

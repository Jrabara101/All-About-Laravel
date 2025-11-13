import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";

import { songs } from "./data/songs";
import { useState } from "react";
import { song } from "./types";

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
  return (
    <main>
      <div className="mt-24 grid gap-8 sm:grid-cols-2">
        <Search />
        <Shortlist />
      </div>
      <SongList song={songs} liked={liked} setLiked={setLiked}  />
      <SongForm />
    </main>
  );
}

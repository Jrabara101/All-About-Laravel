import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Shortlist } from "./components/Shortlist";
import { SongForm } from "./components/SongForm";
import { SongList } from "./components/SongList";

import { LikedContext } from "./context";
import { songs as songsData} from "./data/songs";
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
    const [searchQuery, setSearchQuery] = useState("");
     const [song, setsong] = useState<song[]>(songsData);
  return (
    <LikedContext value={{ liked, setLiked }}>
      <main>
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

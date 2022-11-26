import React from 'react';
import GameBox from './GameBox';
import GameModal from './GameModal';

export default function GamesView() {

  const [gameSelected, setGameSelected] = React.useState(-1);

  return (
    <>
      <section className='games-view'>
        {gameSelected != -1 && <GameModal setGameSelected={setGameSelected} />}
        <h3>Games matched:</h3>
        <section className='games-view__grid'>
          <GameBox
            game={{
              index: 1,
              name: "Super Awesome Game",
              rating: 9,
              ratingCount: 1024,
              releaseDate: "11/26/2022",
              genres: ["Action", "Adventure"],
              platforms: ["PC", "XBOX"],
              tags: ["2D", "Difficult"],
              ageRatings: ["E", "3"],
            }}
            setGameSelected={setGameSelected}
          />
        </section>
      </section>
    </>
  );
}
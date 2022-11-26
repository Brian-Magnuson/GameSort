import React from 'react';
import GameBox from './GameBox';
import GameModal from './GameModal';

export default function GamesView() {

  const gameData = [
    {
      index: 0,
      name: "Super Awesome Game",
      rating: 9,
      ratingCount: 1024,
      releaseDate: "11/26/2022",
      genres: ["Action", "Adventure"],
      platforms: ["PC", "XBOX"],
      tags: ["2D", "Difficult"],
      ageRatings: ["E", "3"],
    },
    {
      index: 1,
      name: "Super Cool Game",
      rating: 8,
      ratingCount: 200,
      releaseDate: "11/26/2022",
      genres: ["Action", "RPG"],
      platforms: ["PC"],
      tags: ["3D", "Open World"],
      ageRatings: ["T", "12"],
    }
  ]

  const [gameSelected, setGameSelected] = React.useState(-1);

  return (
    <>
      <section className='games-view'>
        {gameSelected != -1 && <GameModal
          setGameSelected={setGameSelected}
          game={gameData[gameSelected]}
        />
        }
        <h3>Games matched:</h3>
        <section className='games-view__grid'>
          <GameBox
            game={gameData[0]}
            setGameSelected={setGameSelected}
          />
          <GameBox
            game={gameData[1]}
            setGameSelected={setGameSelected}
          />
        </section>
      </section>
    </>
  );
}
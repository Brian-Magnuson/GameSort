import React from 'react';
import { gameDataObject } from '../data/data';
import GameInfo from '../GameInfo';
import MatchResult from '../MatchResult';

interface GameModalProps {
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
  matchedGame: MatchResult
}
export default function GameModal(props: GameModalProps) {

  const game: GameInfo = gameDataObject.data.find((elem) => elem.index == props.matchedGame.index)!;

  const goUnsetGame = () => {
    props.setGameSelected(-1);
  }

  const platforms = game.platforms != undefined && game.platforms.length != 0
    ? game.platforms.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const genres = game.genres != undefined && game.genres.length != 0
    ? game.genres.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const tags = game.tags != undefined && game.tags.length != 0
    ? game.tags.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const ageRatings = game.ageRatings != undefined && game.ageRatings.length != 0
    ? game.ageRatings.reduce((prev, curr) => prev + ", " + curr)
    : "";

  return (
    <>
      <div className='game-modal-backdrop'>
        <div className="game-modal">
          <header className="game-modal__header">
            <h1>{game.name}</h1>
            <button onClick={goUnsetGame}>Close</button>
          </header>
          <main className="game-modal__content">
            <div className="game-modal__game-image">
              <h5>No Image</h5>
            </div>
            <div className="game-modal__game-info">
              <h4>{platforms && "Platforms: "}</h4>
              <p>{platforms}</p>
              <h4>{game.releaseDate && "Release Date: "}</h4>
              <p>{game.releaseDate}</p>
              <h4>{genres && "Genres: "}</h4>
              <p>{genres}</p>
              <h4>{tags && "Tags: "}</h4>
              <p>{tags}</p>
              <h4>{game.description && "Description: "}</h4>
              <p>{game.description}</p>
              <h4>{game.rating && "Reviews: "}</h4>
              <p>{game.rating}/10 ({game.ratingCount})</p>
              <h4>{ageRatings && "Age Ratings: "}</h4>
              <p>{ageRatings}</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
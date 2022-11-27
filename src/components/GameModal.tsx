import React from 'react';
import GameInfo from '../GameInfo';

interface GameModalProps {
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
  game: GameInfo
}
export default function GameModal(props: GameModalProps) {

  const goUnsetGame = () => {
    props.setGameSelected(-1);
  }

  const platforms = props.game.platforms != undefined && props.game.platforms.length != 0
    ? props.game.platforms.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const genres = props.game.genres != undefined && props.game.genres.length != 0
    ? props.game.genres.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const tags = props.game.tags != undefined && props.game.tags.length != 0
    ? props.game.tags.reduce((prev, curr) => prev + ", " + curr)
    : "";
  const ageRatings = props.game.ageRatings != undefined && props.game.ageRatings.length != 0
    ? props.game.ageRatings.reduce((prev, curr) => prev + ", " + curr)
    : "";

  return (
    <>
      <div className='game-modal-backdrop'>
        <div className="game-modal">
          <header className="game-modal__header">
            <h1>{props.game.name}</h1>
            <button onClick={goUnsetGame}>Close</button>
          </header>
          <main className="game-modal__content">
            <div className="game-modal__game-image">
              <h5>No Image</h5>
            </div>
            <div className="game-modal__game-info">
              <h4>{platforms && "Platforms: "}</h4>
              <p>{platforms}</p>
              <h4>{props.game.releaseDate && "Release Date: "}</h4>
              <p>{props.game.releaseDate}</p>
              <h4>{genres && "Genres: "}</h4>
              <p>{genres}</p>
              <h4>{tags && "Tags: "}</h4>
              <p>{tags}</p>
              <h4>{props.game.description && "Description: "}</h4>
              <p>{props.game.description}</p>
              <h4>{props.game.rating && "Reviews: "}</h4>
              <p>{props.game.rating}/10 ({props.game.ratingCount})</p>
              <h4>{ageRatings && "Age Ratings: "}</h4>
              <p>{ageRatings}</p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
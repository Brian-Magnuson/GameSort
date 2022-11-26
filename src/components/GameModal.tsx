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

  return (
    <>
      <div className='game-modal-backdrop'>
        <div className="game-modal">
          <h1>{props.game.name}</h1>
          <h4>{platforms}</h4>
          <button onClick={goUnsetGame}>Close</button>
        </div>
      </div>
    </>
  );
}
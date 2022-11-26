import React from 'react';
import GameInfo from '../GameInfo';

interface GameBoxProps {
  game: GameInfo,
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
export default function GameBox(props: GameBoxProps) {

  const goSetGame = () => {
    props.setGameSelected(props.game.index);
  }

  return (
    <>
      <div
        className="games-view__game-box"
        onClick={goSetGame}
      >
        <h5>{props.game.name}</h5>
      </div>
    </>
  );
}
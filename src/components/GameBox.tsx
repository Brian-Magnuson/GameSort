import React from 'react';
import GameInfo from '../interfaces/GameInfo';
import MatchResult from '../interfaces/MatchResult';
import { gameDataObject } from '../data/data';

interface GameBoxProps {
  matchedGame: MatchResult,
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
export default function GameBox(props: GameBoxProps) {

  const game: GameInfo = gameDataObject.data.find((elem) => elem.index == props.matchedGame.index)!;

  const goSetGame = () => {
    props.setGameSelected(props.matchedGame.index);
  }


  return (
    <>
      <div
        className="games-view__game-box"
        onClick={goSetGame}
      >
        <h5>{game.name}</h5>
      </div>
    </>
  );
}
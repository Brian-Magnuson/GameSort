import React from 'react';

interface GameBoxProps {
  title: string
}
export default function GameBox(props: GameBoxProps) {
  return (
    <>
      <div className="games-view__game-box">
        <h5>{props.title}</h5>
      </div>
    </>
  );
}
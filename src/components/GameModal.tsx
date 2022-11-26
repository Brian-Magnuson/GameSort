import React from 'react';

interface GameModalProps {
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
export default function GameModal(props: GameModalProps) {

  const goUnsetGame = () => {
    props.setGameSelected(-1);
  }

  return (
    <>
      <div className='game-modal-backdrop'>
        <div className="game-modal">
          <button onClick={goUnsetGame}>Close</button>
        </div>
      </div>
    </>
  );
}
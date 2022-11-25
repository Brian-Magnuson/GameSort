import React from 'react';
import GameBox from './GameBox';

export default function GamesView() {
  return (
    <>
      <section className='games-view'>
        <h3>Games matched:</h3>
        <section className='games-view__grid'>
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
          <GameBox title='Super Awesome Game' />
        </section>
      </section>
    </>
  );
}
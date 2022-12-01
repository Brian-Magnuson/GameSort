import React from 'react'
import MatchResult from '../interfaces/MatchResult'
import GameBox from './GameBox'
import GameModal from './GameModal'

const randomMatches: MatchResult[] = []
for (let i = 0; i < 100; i++) {
  randomMatches.push({
    index: Math.ceil(Math.random() * 100000),
    matchRating: Math.random() * 100,
  })
}

export default function GamesView() {
  const matches: MatchResult[] = randomMatches

  const [gameSelected, setGameSelected] = React.useState(-1)

  const gameBoxes = matches.map((elem) => (
    <GameBox matchedGame={elem} setGameSelected={setGameSelected} />
  ))

  return (
    <>
      <section className='games-view'>
        {gameSelected != -1 && (
          <GameModal
            setGameSelected={setGameSelected}
            matchedGame={
              matches.find(
                (match) => match.index == gameSelected
              ) as MatchResult
            }
          />
        )}
        <h3>Games matched:</h3>
        <section className='games-view__grid'>{gameBoxes}</section>
      </section>
    </>
  )
}

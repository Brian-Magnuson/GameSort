import React from 'react'
import MatchResult from '../interfaces/MatchResult'
import GameBox from './GameBox'
import GameModal from './GameModal'
import GameInfo from '../interfaces/GameInfo'

export default function GamesView() {
  const matches: MatchResult[] = [
    {
      index: 5,
      matchRating: 98,
    },
    {
      index: 1000,
      matchRating: 70,
    },
  ]

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
            matchedGame={matches.find((match) => match.index == gameSelected)}
          />
        )}
        <h3>Games matched:</h3>
        <section className='games-view__grid'>{gameBoxes}</section>
      </section>
    </>
  )
}

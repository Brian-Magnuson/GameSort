import React from 'react'
import GameInfo from '../interfaces/GameInfo'
import MatchResult from '../interfaces/MatchResult'
import { GlobalContext } from './Content'

interface GameBoxProps {
  matchedGame: MatchResult
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
export default function GameBox(props: GameBoxProps) {
  const data = React.useContext(GlobalContext)
  const game: GameInfo = data[props.matchedGame.index.toString()]!

  const goSetGame = () => {
    props.setGameSelected(props.matchedGame.index)
  }

  return (
    <>
      <div className='games-view__game-box' onClick={goSetGame}>
        <h5>{game.name}</h5>
      </div>
    </>
  )
}

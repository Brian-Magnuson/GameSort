import React from 'react'
import { GameInfo, Game } from '../interfaces/GameInfo'
import MatchResult from '../interfaces/MatchResult'
import { GlobalContext } from './Content'

interface GameBoxProps {
  matchedGame: MatchResult
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
export default function GameBox(props: GameBoxProps) {
  const data = React.useContext(GlobalContext)
  const game: Game = data[props.matchedGame.index.toString()]!

  const goSetGame = () => {
    props.setGameSelected(props.matchedGame.index)
  }

  const styles: React.CSSProperties = {
    backgroundImage: `url(${
      game.imageUrl != undefined
        ? game.imageUrl.replace('thumb', 'cover_big')
        : game.imageUrl
    })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (
    <>
      <div>
        <div
          style={styles}
          className='games-view__game-box'
          onClick={goSetGame}
        >
          <div className='games-view__game-box-badge'>
            {(props.matchedGame.matchRating * 100).toFixed(2)}%
          </div>
          {!game.imageUrl && <h4>{game.name}</h4>}
        </div>
        <h5>{game.name}</h5>
      </div>
    </>
  )
}

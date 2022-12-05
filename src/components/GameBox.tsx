import React from 'react'
import { GameInfo, Game } from '../interfaces/GameInfo'
import MatchResult from '../interfaces/MatchResult'
import { GlobalContext } from './Content'

interface GameBoxProps {
  matchedGame: MatchResult
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
}
/**
 * A box that will display on GamesView, showing its image (if there is one) and
 * the name of the game below it.
 * When the box is clicked, the gameSelected state is updated to that box's
 * index, and a modal for that game is rendered.
 * @param props @see GameBoxProps
 * @returns GameBox component
 */
export default function GameBox(props: GameBoxProps) {
  const data = React.useContext(GlobalContext)
  const game: Game = data[props.matchedGame.index.toString()]!

  const goSetGame = () => {
    props.setGameSelected(props.matchedGame.index)
  }

  // Render the game image over the box, if it exists
  const styles: React.CSSProperties = {
    // When 'thumb' is replaced with 'cover_big', a higher res image is rendered
    backgroundImage: `url(${game.imageUrl != undefined
      ? game.imageUrl.replace('thumb', 'cover_big')
      : game.imageUrl
      })`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  // Note, if the image does not exist, then the game name is displayed instead

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

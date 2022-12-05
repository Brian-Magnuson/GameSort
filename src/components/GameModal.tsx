import React from 'react'
import { GameInfo, Game } from '../interfaces/GameInfo'
import MatchResult from '../interfaces/MatchResult'
import { GlobalContext } from './Content'

interface GameModalProps {
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
  matchedGame: MatchResult
}
/**
 * Contains all the information about the game from data. 
 * The game information is looked up by its index, which is provided in the
 * matchedGame property.
 * @param props @see GameModalProps
 * @returns GameModal component
 */
export default function GameModal(props: GameModalProps) {
  const data = React.useContext(GlobalContext)
  const game: Game = data[props.matchedGame.index.toString()]!

  // When the close button is clicked, gameSelected becomes -1, which causes
  // the modal to be unloaded.
  const goUnsetGame = () => {
    props.setGameSelected(-1)
  }

  // Render the game image over the 'No Image' div if the game image exists
  const styles: React.CSSProperties = {
    // When 'thumb' is replaced with 'cover_big', a higher res image is rendered
    backgroundImage:
      game.imageUrl && `url(${game.imageUrl.replace('thumb', 'cover_big')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  // Render certain things only if the data for it exists
  const platforms =
    game.platforms != undefined && game.platforms.length != 0
      ? game.platforms
        .substring(1, game.platforms.length - 1)
        .replace(/'/gi, '')
      : ''
  const genres =
    game.genres != undefined && game.genres.length != 0
      ? game.genres.substring(1, game.genres.length - 1).replace(/'/gi, '')
      : ''
  const tags =
    game.tags != undefined && game.tags.length != 0
      ? game.tags.substring(1, game.tags.length - 1).replace(/'/gi, '')
      : ''
  const ageRatings = game.ageRatings != undefined ? game.ageRatings : ''

  return (
    <>
      <div className='game-modal-backdrop'>
        <div className='game-modal'>
          <header className='game-modal__header'>
            <h1>{game.name} </h1>
            <button onClick={goUnsetGame}>Close</button>
          </header>
          <main className='game-modal__content'>
            <div style={styles} className='game-modal__game-image'>
              {!game.imageUrl && <h5>No Image</h5>}
            </div>
            <div className='game-modal__game-info'>
              <h3>{(props.matchedGame.matchRating * 100).toFixed(2)}% match</h3>
              <h4>{platforms && 'Platforms: '}</h4>
              <p>{platforms}</p>
              <h4>{game.releaseDate && 'Release Date: '}</h4>
              <p>{game.releaseDate}</p>
              <h4>{genres && 'Genres: '}</h4>
              <p>{genres}</p>
              <h4>{tags && 'Tags: '}</h4>
              <p>{tags}</p>
              <h4>{game.description && 'Description: '}</h4>
              <p>{game.description}</p>
              <h4>{game.rating != undefined && 'Reviews: '}</h4>
              <p>
                {game.rating.toFixed(2)}/100 (
                {game.ratingCount == 0 ? 1 : game.ratingCount})
              </p>
              <h4>{ageRatings && 'Age Rating: '}</h4>
              <p>{ageRatings}</p>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

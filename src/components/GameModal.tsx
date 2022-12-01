import React from 'react'
import GameInfo from '../interfaces/GameInfo'
import MatchResult from '../interfaces/MatchResult'
import { GlobalContext } from './Content'

interface GameModalProps {
  setGameSelected: React.Dispatch<React.SetStateAction<number>>
  matchedGame: MatchResult
}
export default function GameModal(props: GameModalProps) {
  const data = React.useContext(GlobalContext)
  const game: GameInfo = data[props.matchedGame.index.toString()]!

  const goUnsetGame = () => {
    props.setGameSelected(-1)
  }
  console.log(props.matchedGame)
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
            <h1>{game.name}</h1>
            <button onClick={goUnsetGame}>Close</button>
          </header>
          <main className='game-modal__content'>
            <div className='game-modal__game-image'>
              {game.imageUrl ? (
                <img
                  src={game.imageUrl.replace('thumb', 'cover_big')}
                  alt={`${game.name}-image`}
                />
              ) : (
                <h5>No Image</h5>
              )}
            </div>
            <div className='game-modal__game-info'>
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
              <h4>{game.rating && 'Reviews: '}</h4>
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

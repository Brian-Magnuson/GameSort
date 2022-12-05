/**
 * Defines the shape of a Game object used by GameModal and GameBox components
 */
interface Game {
  name: string
  description?: string
  rating: number
  ratingCount?: number
  releaseDate?: string
  genres?: string
  platforms?: string
  tags?: string
  ageRatings?: string
  imageUrl?: string
  similarGames?: string
  url?: string
}

interface NewGame {
  index: number
  name: string
  description?: string
  rating: number
  ratingCount?: number
  releaseDate?: string
  genres?: string
  platforms?: string
  tags?: string[]
  ageRatings?: string
  imageUrl?: string
  similarGames?: string[]
  url?: string
}

/**
 * Defines the shape of the data object located in public/data/data.json
 */
interface GameInfo {
  [key: string]: Game
}

export type { Game, GameInfo, NewGame }

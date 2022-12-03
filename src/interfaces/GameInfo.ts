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

interface GameInfo {
  [key: string]: Game
}

export type { Game, GameInfo, NewGame }

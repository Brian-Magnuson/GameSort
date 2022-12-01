interface Game {
  name: string
  description?: string
  rating?: number
  ratingCount?: number
  releaseDate?: string
  genres?: string[]
  platforms?: string[]
  tags?: string[]
  ageRatings?: string
  imageUrl?: string
  similarGames?: string[]
  url?: string[]
}

export default interface GameInfo {
  [key: string]: Game
}

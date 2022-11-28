
export default interface GameInfo {
  index: number,
  name: string,
  description?: string,
  rating?: number,
  ratingCount?: number,
  releaseDate?: string,
  genres?: string[],
  platforms?: string[],
  tags?: string[],
  ageRatings?: string[],
  imageUrl?: string,
  similarGames?: string[]
}
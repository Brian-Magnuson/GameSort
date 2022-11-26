
export default interface GameInfo {
  index: number,
  name: string,
  rating?: number,
  ratingCount?: number,
  releaseDate?: string,
  genres?: string[],
  platforms?: string[],
  tags?: string[],
  ageRatings?: string[],
  imageUrl?: string
}
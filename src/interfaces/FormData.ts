
export default interface FormData {
  keywords: string,
  platforms: string[],
  genres: string[],
  ageRatings: string[],
  beforeReleaseDate: string,
  afterReleaseDate: string,
  ratingsAtLeast: number,
  ratingsAtMost: number,
  ratingCountAtLeast: number
}
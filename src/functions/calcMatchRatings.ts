import { GameInfo } from '../interfaces/GameInfo'
import FormInput from '../interfaces/FormInput'
import MatchResult from '../interfaces/MatchResult'

function calculateMatchRatings(
  data: GameInfo,
  formInput: FormInput,
  newMatches: MatchResult[]
) {
  for (let i = 0; i < 128434; i++) {
    let currGame = data[i.toString()]
    let totalFilter = 0
    let matchedFilter = 0
    if ('afterReleaseDate' in formInput) {
      totalFilter++
      if (currGame['releaseDate'] != null) {
        let d1 = new Date(formInput['afterReleaseDate'] as string)
        let d2 = new Date(currGame['releaseDate'])
        if (d2 >= d1) matchedFilter++
      }
    }
    if ('beforeReleaseDate' in formInput) {
      totalFilter++
      if (currGame['releaseDate'] != null) {
        let d1 = new Date(formInput['beforeReleaseDate'] as string)
        let d2 = new Date(currGame['releaseDate'])
        if (d2 <= d1) matchedFilter++
      }
    }
    formInput['ageRatings'].forEach((rating) => {
      totalFilter++
      if (currGame['ageRatings'] != null && rating == currGame['ageRatings']) {
        matchedFilter++
      }
    })
    formInput['genres'].forEach((genre) => {
      totalFilter++
      if (currGame['genres'] != null) {
        let currGenres = eval(currGame['genres'])
        if (currGenres.includes(genre)) {
          matchedFilter++
        }
      }
    })
    formInput['platforms'].forEach((platform) => {
      totalFilter++
      if (currGame['platforms'] != null) {
        let currPlatforms = eval(currGame['platforms'])
        if (currPlatforms.includes(platform)) {
          matchedFilter++
        }
      }
    })
    if (formInput['ratingCountAtLeast'] != null) {
      totalFilter++
      if (
        currGame['ratingCount'] != null &&
        currGame['ratingCount'] >= formInput['ratingCountAtLeast']
      ) {
        matchedFilter++
      }
    }
    if (formInput['ratingsAtLeast'] != null) {
      totalFilter++
      if (
        currGame['rating'] != null &&
        currGame['rating'] >= formInput['ratingsAtLeast']
      ) {
        matchedFilter++
      }
    }
    if (formInput['ratingsAtMost'] != null) {
      totalFilter++
      if (
        currGame['rating'] != null &&
        currGame['rating'] <= formInput['ratingsAtMost']
      ) {
        matchedFilter++
      }
    }
    let currMatchRating = matchedFilter / totalFilter
    newMatches.push({ matchRating: currMatchRating, index: i })
  }
}

export default calculateMatchRatings

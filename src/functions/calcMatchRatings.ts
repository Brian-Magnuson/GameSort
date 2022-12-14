import { Game, GameInfo, NewGame } from '../interfaces/GameInfo'
import FormInput from '../interfaces/FormInput'
import MatchResult from '../interfaces/MatchResult'
import Fuse from 'fuse.js'

interface SimilarityObject {
  [key: number]: number
}

function parseKeywords(keywords: string) {
  let temp = keywords.match(/"[^"]*"|\S+/g)
  return temp
}

function calculateMatchRatings(
  data: GameInfo,
  formInput: FormInput,
  newMatches: MatchResult[]
) {
  // options for keyword fuzzy search
  const options = {
    ignoreLocation: true,
    includeScore: true,
    keys: [
      {
        name: 'name',
        weight: 0.25,
      },
      {
        name: 'tags',
        weight: 0.005,
      },
      {
        name: 'similarGames',
        weight: 0.17,
      },
    ],
  }
  const newData: NewGame[] = []
  // loop through every game
  for (let i = 0; i < 128434; i++) {
    let currGame = data[i.toString()]
    let matchedAgeRatings = 0
    let matchedGenres = 0
    let genresWeight = 0
    let matchedPlatforms = 0
    let platformsWeight = 0
    // if game is released before filtered date, continue to next game
    if ('afterReleaseDate' in formInput) {
      if (currGame['releaseDate'] != null) {
        let d1 = new Date(formInput['afterReleaseDate'] as string)
        let d2 = new Date(currGame['releaseDate'])
        if (d2 < d1) {
          continue
        }
      }
    }
    // if game is released after filtered date, continue to next game
    if ('beforeReleaseDate' in formInput) {
      if (currGame['releaseDate'] != null) {
        let d1 = new Date(formInput['beforeReleaseDate'] as string)
        let d2 = new Date(currGame['releaseDate'])
        if (d2 > d1) continue
      }
    }
    // if game rating count is below filtered count, continue to next game
    if (formInput['ratingCountAtLeast'] != null) {
      if (
        currGame['ratingCount'] != null &&
        currGame['ratingCount'] < formInput['ratingCountAtLeast']
      ) {
        continue
      }
    }
    // if rating is lower than filtered range, continue to next game
    if (formInput['ratingsAtLeast'] != null) {
      if (
        currGame['rating'] != null &&
        currGame['rating'] < formInput['ratingsAtLeast']
      ) {
        continue
      }
    }
    // if rating is above filtered range, continue to next game
    if (formInput['ratingsAtMost'] != null) {
      if (
        currGame['rating'] != null &&
        currGame['rating'] > formInput['ratingsAtMost']
      ) {
        continue
      }
    }
    // if age rating doesn't match filter, contine to next game
    formInput['ageRatings'].forEach((rating) => {
      if (currGame['ageRatings'] != null && rating == currGame['ageRatings']) {
        matchedAgeRatings++
      }
    })
    if (matchedAgeRatings == 0 && formInput['ageRatings'].length > 0) continue
    // count matching genres and platforms. additional matching genres/platforms contribute to match rating sublinearly (cube root)
    formInput['genres'].forEach((genre) => {
      if (currGame['genres'] != null) {
        let currGenres = eval(currGame['genres'])
        if (currGenres.includes(genre)) {
          matchedGenres++
        }
      }
    })
    if (matchedGenres == 0 && formInput['genres'].length > 0) continue
    if (formInput['genres'].length > 0)
      genresWeight = Math.cbrt(formInput['genres'].length)
    formInput['platforms'].forEach((platform) => {
      if (currGame['platforms'] != null) {
        let currPlatforms = eval(currGame['platforms'])
        if (currPlatforms.includes(platform)) {
          matchedPlatforms++
        }
      }
    })
    if (matchedPlatforms == 0 && formInput['platforms'].length > 0) continue
    if (formInput['platforms'].length > 0)
      platformsWeight = Math.cbrt(formInput['platforms'].length)
    let platformAndGenresRating =
      (Math.cbrt(matchedGenres) + Math.cbrt(matchedPlatforms)) /
      (platformsWeight + genresWeight)
    let keywordWeight = 0
    let currMatchRating = isNaN(platformAndGenresRating)
      ? 1 + keywordWeight
      : platformAndGenresRating + keywordWeight
    let currNewGame: NewGame = {
      index: i,
      name: currGame['name'],
      description: currGame['description'],
      rating: currGame['rating'],
      ratingCount: currGame['ratingCount'],
      releaseDate: currGame['releaseDate'],
      genres: currGame['genres'],
      platforms: currGame['platforms'],
      tags: currGame['tags'] != undefined ? eval(currGame['tags']) : undefined,
      ageRatings: currGame['ageRatings'],
      imageUrl: currGame['imageUrl'],
      similarGames:
        currGame['similarGames'] != undefined
          ? eval(currGame['similarGames'])
          : undefined,
      url: currGame['url'],
    }
    let ratingCountAdjusted = 1
    // adjust match rating using rating count and rating using
    if (currGame['ratingCount'] != undefined && currGame['ratingCount'] > 0)
      ratingCountAdjusted =
        currGame['ratingCount'] >= 100
          ? Math.cbrt(100)
          : Math.cbrt(currGame['ratingCount'])
    let ratingWeight = ((currGame['rating'] / 100) * ratingCountAdjusted) / 4.64
    currMatchRating += ratingWeight * 2
    currMatchRating /= 3
    newData.push(currNewGame)
    newMatches.push({
      matchRating: currMatchRating,
      index: i,
    })
  }
  // adjust match rating with keyword similarity ratings
  const fuse = new Fuse(newData, options)
  let keywordLength = 0
  let similaritiesObj: SimilarityObject = {}
  if (formInput['keywords'].length > 0) {
    let keywords = parseKeywords(formInput['keywords'])
    if (keywords != undefined && keywords.length > 0) {
      keywordLength = keywords.length
      keywords.forEach((keyword) => {
        let similarities = fuse.search(keyword)
        let multiplyBy = 1
        if (similarities.length > 0)
          multiplyBy = 0.9 / (1 - (similarities[0]['score'] as number))
        similarities.forEach((similarity) => {
          if (newData[similarity['refIndex']]['index'] in similaritiesObj)
            similaritiesObj[newData[similarity['refIndex']]['index']] +=
              Math.sqrt((1 - (similarity['score'] as number)) * multiplyBy)
          else {
            similaritiesObj[newData[similarity['refIndex']]['index']] =
              Math.sqrt((1 - (similarity['score'] as number)) * multiplyBy)
          }
        })
      })
    }
    newMatches.forEach((match) => {
      if (match['index'] in similaritiesObj) {
        match['matchRating'] +=
          (similaritiesObj[match['index']] / keywordLength) * 2
        match['matchRating'] /= 3
      } else {
        match['matchRating'] /= 3
      }
    })
  }
}

export default calculateMatchRatings

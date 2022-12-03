import React from 'react'
import MatchResult from '../interfaces/MatchResult'
import GameBox from './GameBox'
import GameModal from './GameModal'
import FormInput from '../interfaces/FormInput'
import { GlobalContext } from './Content'
import { mergeSort } from '../functions/sort'
import calculateMatchRatings from '../functions/calcMatchRatings'

interface GamesViewProps {
  formInput: FormInput
  findMatchRatingsToggle: Boolean
  setFindMatchRatingsToggle: React.Dispatch<React.SetStateAction<Boolean>>
}
export default function GamesView(props: GamesViewProps) {
  const [matches, setMatches] = React.useState<MatchResult[]>([])
  const data = React.useContext(GlobalContext)
  const [gameSelected, setGameSelected] = React.useState(-1)
  const [sortTime, setSortTime] = React.useState(0)

  React.useEffect(() => {
    if (props.findMatchRatingsToggle) {
      props.setFindMatchRatingsToggle(false)
      let newMatches: MatchResult[] = []
      for (let i = 0; i < 128434; i++) {
        let currGame = data[i.toString()]
        let totalFilter = 0
        let matchedFilter = 0
        if ('afterReleaseDate' in props.formInput) {
          totalFilter++
          if (currGame['releaseDate'] != null) {
            let d1 = new Date(props.formInput['afterReleaseDate'] as string)
            let d2 = new Date(currGame['releaseDate'])
            if (d2 >= d1) matchedFilter++
          }
        }
        if ('beforeReleaseDate' in props.formInput) {
          totalFilter++
          if (currGame['releaseDate'] != null) {
            let d1 = new Date(props.formInput['beforeReleaseDate'] as string)
            let d2 = new Date(currGame['releaseDate'])
            if (d2 <= d1) matchedFilter++
          }
        }
        props.formInput['ageRatings'].forEach((rating) => {
          totalFilter++
          if (
            currGame['ageRatings'] != null &&
            rating == currGame['ageRatings']
          ) {
            matchedFilter++
          }
        })
        props.formInput['genres'].forEach((genre) => {
          totalFilter++
          if (currGame['genres'] != null) {
            let currGenres = eval(currGame['genres'])
            if (currGenres.includes(genre)) {
              matchedFilter++
            }
          }
        })
        props.formInput['platforms'].forEach((platform) => {
          totalFilter++
          if (currGame['platforms'] != null) {
            let currPlatforms = eval(currGame['platforms'])
            if (currPlatforms.includes(platform)) {
              matchedFilter++
            }
          }
        })
        if (props.formInput['ratingCountAtLeast'] != null) {
          totalFilter++
          if (
            currGame['ratingCount'] != null &&
            currGame['ratingCount'] >= props.formInput['ratingCountAtLeast']
          ) {
            matchedFilter++
          }
        }
        if (props.formInput['ratingsAtLeast'] != null) {
          totalFilter++
          if (
            currGame['rating'] != null &&
            currGame['rating'] >= props.formInput['ratingsAtLeast']
          ) {
            matchedFilter++
          }
        }
        if (props.formInput['ratingsAtMost'] != null) {
          totalFilter++
          if (
            currGame['rating'] != null &&
            currGame['rating'] <= props.formInput['ratingsAtMost']
          ) {
            matchedFilter++
          }
        }
        let currMatchRating = matchedFilter / totalFilter
        newMatches.push({ matchRating: currMatchRating, index: i })
      }
      console.log('done matching ratings')
      const startTime = performance.now();
      mergeSort(newMatches)
      const endTime = performance.now();
      setSortTime(endTime - startTime)
      setMatches(newMatches)
      console.log('done sorting')
    }
  }, [props.findMatchRatingsToggle])

  const gameBoxes = matches.map((elem, index) => {
    if (index <= 100) {
      return (
        <GameBox
          key={elem.index}
          matchedGame={elem}
          setGameSelected={setGameSelected}
        />
      )
    }
  })

  return (
    <>
      {matches.length > 0 && (
        <section className='games-view'>
          {gameSelected != -1 && (
            <GameModal
              setGameSelected={setGameSelected}
              matchedGame={
                matches.find(
                  (match) => match.index == gameSelected
                ) as MatchResult
              }
            />
          )}
          <h3>Sort Time: {sortTime.toFixed(1)} ms; Games matched:</h3>
          <section className='games-view__grid'>{gameBoxes}</section>
        </section>
      )}
    </>
  )
}

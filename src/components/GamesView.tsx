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
  matches: MatchResult[]
  setMatches: React.Dispatch<React.SetStateAction<MatchResult[]>>
}
export default function GamesView(props: GamesViewProps) {
  const data = React.useContext(GlobalContext)
  const [gameSelected, setGameSelected] = React.useState(-1)
  const [sortTime, setSortTime] = React.useState(0)
  const [numDisplayed, setNumDisplayed] = React.useState(100);

  React.useEffect(() => {
    if (props.findMatchRatingsToggle) {
      props.setFindMatchRatingsToggle(false)
      let newMatches: MatchResult[] = []
      calculateMatchRatings(data, props.formInput, newMatches)
      const startTime = performance.now()
      mergeSort(newMatches)
      const endTime = performance.now()
      setSortTime(endTime - startTime)
      props.setMatches(newMatches)
    }
  }, [props.findMatchRatingsToggle])
  React.useEffect(() => {
    if (props.matches.length == 0) props.setFindMatchRatingsToggle(true)
    setNumDisplayed(100)
  }, [props.matches])

  const gameBoxes = props.matches.map((elem, index) => {
    if (props.matches.length == 1 && props.matches[0]['index'] == -1) {
      return
    }
    if (props.matches.length < numDisplayed) {
      setNumDisplayed(props.matches.length)
    }
    if (index <= Math.min(props.matches.length, numDisplayed)) {
      return (
        <GameBox
          key={elem.index}
          matchedGame={elem}
          setGameSelected={setGameSelected}
        />
      )
    }
  })

  const goShowMoreGames = () => {
    setNumDisplayed((prev) => prev + 100)
  }

  return (
    <>
      <section className='games-view'>
        {gameSelected != -1 && (
          <GameModal
            setGameSelected={setGameSelected}
            matchedGame={
              props.matches.find(
                (match) => match.index == gameSelected
              ) as MatchResult
            }
          />
        )}

        {props.matches[0] && props.matches[0]['index'] != -1 &&
          <div>
            <h3>Showing {Math.min(numDisplayed, props.matches.length)} of {props.matches.length} matched games</h3>
            <h6>Sorted {props.matches.length} of {Object.keys(data).length} games</h6>
            <h6>Sort time: {sortTime.toFixed(1)} ms</h6>
          </div>
        }
        {props.matches.length == 0 &&
          <h3>Showing 0 of 0 matched games</h3>
        }

        <section className='games-view__grid'>{gameBoxes}</section>

        {props.matches[0] && props.matches[0]['index'] != -1 && numDisplayed != props.matches.length &&
          <button className='games-view__show-more-button' onClick={goShowMoreGames}>Show more games</button>
        }
      </section>
    </>
  )
}

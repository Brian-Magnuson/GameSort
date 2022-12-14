import React from 'react'
import MatchResult from '../interfaces/MatchResult'
import GameBox from './GameBox'
import GameModal from './GameModal'
import FormInput from '../interfaces/FormInput'
import { GlobalContext } from './Content'
import { mergeSort, quickSort, heapSort, jsSort } from '../functions/sort'
import calculateMatchRatings from '../functions/calcMatchRatings'

interface GamesViewProps {
  formInput: FormInput
  findMatchRatingsToggle: Boolean
  setFindMatchRatingsToggle: React.Dispatch<React.SetStateAction<boolean>>
  matches: MatchResult[]
  setMatches: React.Dispatch<React.SetStateAction<MatchResult[]>>
}
/**
 * The component where the game boxes and sort time are displayed.
 * Also displays GameModal when a game is selected.
 * Reads matches, and uses the data from GlobalContext to create a list of
 * all games to be rendered to the screen.
 * Also contains a React effect where the matching algorithm and sort are
 * triggered.
 * @param props @see GamesViewProps
 * @returns GamesView component
 */
export default function GamesView(props: GamesViewProps) {
  const data = React.useContext(GlobalContext)
  // If gameSelected is -1, then the modal does not render
  // If gameSelected is not -1, then the value reflects the index of the game
  // being displayed.
  const [gameSelected, setGameSelected] = React.useState(-1)
  const [sortTime, setSortTime] = React.useState(0)
  const [numDisplayed, setNumDisplayed] = React.useState(100);

  // When props.findMatchRatingsToggle changes...
  React.useEffect(() => {
    if (props.findMatchRatingsToggle) {
      props.setFindMatchRatingsToggle(false)
      // Create an empty array of matches
      let newMatches: MatchResult[] = []

      // Set the sorting algorithm
      let sortingFunc: (arr: MatchResult[]) => void
      if (props.formInput.sortSelection == "Merge")
        sortingFunc = mergeSort;
      else if (props.formInput.sortSelection == "Quick")
        sortingFunc = quickSort;
      else if (props.formInput.sortSelection == "Heap")
        sortingFunc = heapSort;
      else if (props.formInput.sortSelection == "JsSort")
        sortingFunc = jsSort;
      else
        sortingFunc = jsSort;

      // Calculate all the match results
      calculateMatchRatings(data, props.formInput, newMatches)
      // Sort everything
      const startTime = performance.now()
      sortingFunc(newMatches)
      const endTime = performance.now()
      // Set the sort time and matches
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
    // Sets a cap on the number of games that can be displayed at once
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

  // Displays 100 more games when the user clicks a button
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

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
  }, [props.matches])

  const gameBoxes = props.matches.map((elem, index) => {
    if (props.matches.length == 1 && props.matches[0]['index'] == -1) return
    else if (index <= 100) {
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
        <h3>Sort Time: {sortTime.toFixed(1)} ms; Games matched:</h3>
        <section className='games-view__grid'>{gameBoxes}</section>
      </section>
    </>
  )
}

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
      calculateMatchRatings(data, props.formInput, newMatches)
      console.log('done matching ratings')
      const startTime = performance.now()
      mergeSort(newMatches)
      const endTime = performance.now()
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

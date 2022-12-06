import React from 'react'
import GamesView from './GamesView'
import Sidebar from './Sidebar'
import SortSelection from './SortSelection'
import { GameInfo } from '../interfaces/GameInfo'
import dataFetch from '../data/data'
import Loading from './Loading'
import FormInput from '../interfaces/FormInput'
import MatchResult from '../interfaces/MatchResult'

let defaultData: GameInfo = {}
export const GlobalContext = React.createContext(defaultData)
/**
 * Contains the Sidebar, SortSelection, and Gamesview components.
 * Also stores the state for the form input where it can be accessed by
 * GamesView and used to determine what games to display.
 * @returns Content component
 */
export default function Content() {
  const [data, setData] = React.useState<GameInfo | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    dataFetch.then((data) => {
      setData(data as GameInfo)
      setLoading(false)
    })
  })

  // State for the form input from the Sidebar and SortSelection components
  const [formInput, setFormInput] = React.useState<FormInput>({
    keywords: '',
    platforms: [],
    genres: [],
    ageRatings: [],
    afterReleaseDate: '2000-01-01',
    ratingsAtLeast: 20,
    ratingsAtMost: 100,
    ratingCountAtLeast: 50,
    sortSelection: 'Merge',
  })
  const [findMatchRatingsToggle, setFindMatchRatingsToggle] =
    React.useState<boolean>(false)
  // A list of matches after the calcMatchRatings function is run.
  // This default value tells GamesView not to render any games.
  const [matches, setMatches] = React.useState<MatchResult[]>([
    { index: -1, matchRating: -1 },
  ])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='content'>
          <GlobalContext.Provider value={data as GameInfo}>
            <Sidebar
              formInput={formInput}
              setFormInput={setFormInput}
              findMatchRatingsToggle={findMatchRatingsToggle}
              setFindMatchRatingsToggle={setFindMatchRatingsToggle}
              matches={matches}
              setMatches={setMatches}
            />
            <SortSelection formInput={formInput} setFormInput={setFormInput} />
            <GamesView
              formInput={formInput}
              findMatchRatingsToggle={findMatchRatingsToggle}
              setFindMatchRatingsToggle={setFindMatchRatingsToggle}
              matches={matches}
              setMatches={setMatches}
            />
          </GlobalContext.Provider>
        </main>
      )}
    </>
  )
}

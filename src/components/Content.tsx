import React from 'react'
import GamesView from './GamesView'
import Sidebar from './Sidebar'
import SortSelection from './SortSelection'
import { GameInfo } from '../interfaces/GameInfo'
import dataFetch from '../data/data'
import Loading from './Loading'
import FormInput from '../interfaces/FormInput'

let defaultData: GameInfo = {}
export const GlobalContext = React.createContext(defaultData)
export default function Content() {
  const [data, setData] = React.useState<GameInfo | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    dataFetch.then((data) => {
      setData(data as GameInfo)
      setLoading(false)
    })
  })

  const [formInput, setFormInput] = React.useState<FormInput>(
    {
      keywords: "",
      platforms: [],
      genres: [],
      ageRatings: ["Everyone", "Teen"],
      afterReleaseDate: "2000-01-01",
      ratingsAtLeast: 50,
      ratingsAtMost: 1000000,
      ratingCountAtLeast: 1000,
      sortSelection: "Merge"
    }
  )

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='content'>
          <GlobalContext.Provider value={data as GameInfo}>
            <Sidebar formInput={formInput} setFormInput={setFormInput} />
            <SortSelection formInput={formInput} setFormInput={setFormInput} />
            <GamesView />
          </GlobalContext.Provider>
        </main>
      )}
    </>
  )
}

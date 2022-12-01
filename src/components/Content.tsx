import React from 'react'
import GamesView from './GamesView'
import Sidebar from './Sidebar'
import SortSelection from './SortSelection'
import { GameInfo } from '../interfaces/GameInfo'
import dataFetch from '../data/data'
import Loading from './Loading'

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
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='content'>
          <GlobalContext.Provider value={data as GameInfo}>
            <Sidebar />
            <SortSelection />
            <GamesView />
          </GlobalContext.Provider>
        </main>
      )}
    </>
  )
}

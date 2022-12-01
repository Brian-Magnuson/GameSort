import React from 'react'
import GamesView from './GamesView'
import Sidebar from './Sidebar'
import SortSelection from './SortSelection'
import GameInfo from '../interfaces/GameInfo'
import dataFetch from '../data/data'
import Loading from './Loading'

interface ContentProps {
  data: GameInfo
}
export const GlobalContext = React.createContext()
export default function Content() {
  const [data, setData] = React.useState<GameInfo | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    dataFetch.then((data) => {
      setData(data)
      setLoading(false)
    })
  })
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className='content'>
          <GlobalContext.Provider value={data}>
            <Sidebar />
            <SortSelection />
            <GamesView />
          </GlobalContext.Provider>
        </main>
      )}
    </>
  )
}

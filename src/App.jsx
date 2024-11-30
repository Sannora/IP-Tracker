import './App.css'
import InfoDisplay from './Components/InfoDisplay/InfoDisplay'
import Map from './Components/Map/Map'
import SearchUtility from './Components/SearchUtility/SearchUtility'
import { QueryProvider } from './Context/QueryContext'

function App() {

  return (
    <>
      <QueryProvider>
        <SearchUtility />
        <InfoDisplay />
        <Map />
      </QueryProvider>
    </>
  )
}

export default App

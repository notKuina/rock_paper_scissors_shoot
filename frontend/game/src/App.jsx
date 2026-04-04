
import './App.css'
// import StartAnimation from './components/StartAnimation'
import Game from './pages/Game'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<StartAnimation/>} /> */}
      <Route path="/" element={<Game />} />
    </Routes>
    </>
  )
}

export default App

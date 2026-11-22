import { useState } from 'react'
import './App.css'
import Grid from './components/Grid'

function App() {
  const [ won, setWon ] = useState(false);
  return (
    <div className="game">
      <h1>Gomple</h1>
      <h2>Can you guess the word today?</h2>
      <Grid setWon={setWon}/>
      <h3>{ won ? "Awesome job! Come back later to try again!" : "Keep trying! I believe in you."}</h3>
    </div>
  )
}

export default App

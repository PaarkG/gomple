import { useEffect, useState } from 'react'
import './App.css'
import Grid from './components/Grid'

function App() {
  const [ won, setWon ] = useState(false);
  if (localStorage.getItem("gomple_streak") == null) localStorage.setItem("gomple_streak", "0");
  const storedStreak = localStorage.getItem("gomple_streak");
  const streak = storedStreak == null ? 0 : parseInt(storedStreak);

  console.log(streak);

  useEffect(() => {
    if (won) localStorage.setItem("gomple_streak", (streak + 1).toString());
  }, [won, streak]);

  return (
    <div className="game">
      <h1>Gomple</h1>
      <h2>Can you guess the word today?</h2>
      <Grid setWon={setWon}/>
      <h3>{ won ? "Awesome job! Come back later to try again!" : "Keep trying! I believe in you."}</h3>
      <p>{ streak == 0 && !won ? "Today is the start of something great.." : "Wow, you have a streak of " 
          + (streak + (won ? 1 : 0)) +"!" 
          + ((streak + (won ? 1 : 0)) >= 3 ? "🔥" : "")}</p>
      <p><small>Gomple is presented by <em>&lt;your browser&gt;</em>. Mobile support coming soon.</small></p>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import Grid from './components/Grid'

if (localStorage.getItem("gomple_streak") == null) localStorage.setItem("gomple_streak", "0");
const storedStreak = localStorage.getItem("gomple_streak");
const streak = storedStreak == null ? 0 : parseInt(storedStreak);

if (localStorage.getItem("gomple_last_win") == null) localStorage.setItem("gomple_last_win", "0");
const lastWinString = localStorage.getItem("gomple_last_win");
const lastWin = lastWinString == null ? 0 : parseInt(lastWinString);

function wasOneDayAgo(time: number) {
  return (Date.now() - time) > (24 * 60 * 60 * 1000);
}

function App() {
  const [won, setWon] = useState(!wasOneDayAgo(lastWin));
  const wonBeforeLoad = won;

  useEffect(() => {
    if (won && wasOneDayAgo(lastWin)) {
      localStorage.setItem("gomple_streak", (streak + 1).toString());
      localStorage.setItem("gomple_last_win", Date.now().toString())
    }
  }, [won]);

  return (
    <div className="game">
      <h1>Gomple</h1>
      { wonBeforeLoad ? (<h2>Silly goose, you already won today!</h2>) : (<h2>Can you guess the word today?</h2>)}
      
      <Grid setWon={setWon} alreadyWon={wasOneDayAgo(lastWin)} />
      
      <h3>{won ? "Awesome job! Come back later to try again!" : "Keep trying! I believe in you."}</h3>
      <p>{streak == 0 && !won ? "Today is the start of something great.." : "Wow, you have a streak of "
        + (streak + (won ? 1 : 0)) + "!"
        + ((streak + (won ? 1 : 0)) >= 3 ? "🔥" : "")}</p>
      <p><small>Gomple is presented by <em>&lt;your browser&gt;</em>. Mobile support coming soon.</small></p>
    </div>
  )
}

export default App

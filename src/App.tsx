import { useState } from 'react'
import './App.css'
import Grid from './components/Grid'

/**
 * Helper that returns if the input time is before the start of today, local time
 * @param time the timestamp to compare, in ms since epoch UTC
 * @returns true or false depending on input time
 */
const wasBeforeToday = (time: number) => time < getStartOfToday();

/**
 * Helper that returns the timestamp of the start of today in local time
 * @returns the timestamp, in ms time since epoch UTC, of the start of today
 */
const getStartOfToday = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function App() {

  const [lastWin, setLastWin] = useState(Number(localStorage.getItem("gomple_last_win") ?? 0));

  const initialStreak = Number(localStorage.getItem("gomple_streak") ?? 0);
  const streakExpired = lastWin < getStartOfToday() - (24 * 60 * 60 * 1000);

  const [streak, setStreak] = useState(streakExpired ? 0 : initialStreak);
  const [won, setWon] = useState(!wasBeforeToday(lastWin));

  if (streakExpired) localStorage.setItem("gomple_streak", "0");
  
  // handler to update when won, passed to grid
  const handleWin = () => {
    setWon(true);

    setStreak((prevStreak) => {
      const newStreak = prevStreak + 1;
      localStorage.setItem("gomple_streak", newStreak.toString());
      return newStreak;
    });

    const now = new Date();
    setLastWin(now.getTime());
    localStorage.setItem("gomple_last_win", now.getTime().toString());
  }

  return (
    <div className="game">
      <h1>Gomple</h1>
      { won ? (<h2>Good work today. Come back tomorrow!</h2>) : (<h2>Can you guess the word today?</h2>)}
      
      <Grid onWon={handleWin} alreadyWon={wasBeforeToday(lastWin)} />
      
      <h3>{won ? "Awesome job! Come back later to try again!" : "Keep trying! I believe in you."}</h3>
      <p>{streak == 0 && !won ? "Today is the start of something great.." : "Wow, you have a streak of " + streak + "!" + (streak >= 3 ? "🔥" : "")}</p>
      <p><small>Gomple is presented by <em>&lt;your browser&gt;</em>. Mobile support coming soon.</small></p>
    </div>
  )
}

export default App

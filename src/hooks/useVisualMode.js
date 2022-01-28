import { useState } from 'react';

export default function useVisualMode(initial) {

  // set and use state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to a new view
  function transition(newMode, replace = false) {
    setMode(newMode);
  
    // create history to prevent loading view
    if (replace) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory([...newHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }

  // go back to preveiw
  function back() {
    if (history.length >= 1) {
      const newHistory = [...history];
      newHistory.pop();

      setMode(history[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back };
} 
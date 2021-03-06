import { useState } from 'react';

export default function useVisualMode(initial) {

  // set and use state
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to a new view
  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  // go back to preveiw
  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setMode(history[newHistory.length - 1]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  return { mode, transition, back };
} 
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  return { mode };
}

function useCustomHook() {
  function action() {}

  return { action };
}
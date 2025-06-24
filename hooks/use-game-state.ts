"use client"

import { useState, useCallback } from "react"
import { GameState } from "@/types/game"

export function useGameState() {
  const [gameState] = useState(() => new GameState())

  const handleInput = useCallback(
    (action: string) => {
      gameState.handleInput(action)
    },
    [gameState],
  )

  return gameState
}

"use client"

import { useEffect, useRef } from "react"
import { GameRenderer } from "@/lib/game-renderer"
import type { GameState } from "@/types/game"

interface GameCanvasProps {
  gameState: GameState
  keys: Record<string, boolean>
}

export default function GameCanvas({ gameState, keys }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GameRenderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    rendererRef.current = new GameRenderer(ctx, canvas.width, canvas.height)

    const gameLoop = () => {
      // Mise à jour de la logique du jeu
      gameState.update(keys)

      // Rendu du jeu
      rendererRef.current?.render(gameState)

      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  }, [gameState, keys])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="w-full h-auto bg-gray-800 rounded-lg shadow-2xl border border-gray-700"
      />

      {/* Overlay pour les effets */}
      <div className="absolute inset-0 pointer-events-none">
        {gameState.car.headlights && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-xl" />
        )}
      </div>
    </div>
  )
}

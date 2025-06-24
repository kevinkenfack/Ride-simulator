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
    <div className="relative group">
      <canvas
        ref={canvasRef}
        width={900}
        height={600}
        className="w-full h-auto bg-gray-900 rounded-xl shadow-2xl border-2 border-cyan-500/30 transition-all duration-300 group-hover:border-cyan-400/50"
      />

      {/* Overlay pour les effets */}
      <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
        {gameState.car.headlights && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-yellow-300 opacity-10 rounded-full blur-3xl animate-pulse" />
        )}

        {/* Effet de scan futuriste */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse" />

        {/* Bordure animée */}
        <div className="absolute inset-0 rounded-xl border border-cyan-400/20 animate-pulse" />
      </div>

      {/* HUD overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
        <div className="text-cyan-400 text-sm font-mono">
          <div>VITESSE: {Math.round(gameState.car.speed * 15)} km/h</div>
          <div>
            POSITION: {Math.round(gameState.car.x)}, {Math.round(gameState.car.y)}
          </div>
        </div>
      </div>
    </div>
  )
}

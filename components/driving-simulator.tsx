"use client"
import GameCanvas from "./game-canvas"
import Dashboard from "./dashboard"
import Controls from "./controls"
import { useGameState } from "@/hooks/use-game-state"
import { useKeyboardControls } from "@/hooks/use-keyboard-controls"

export default function DrivingSimulator() {
  const gameState = useGameState()
  const { keys } = useKeyboardControls()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">🚗 Simulateur de Conduite</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas de jeu */}
          <div className="lg:col-span-2">
            <GameCanvas gameState={gameState} keys={keys} />
          </div>

          {/* Tableau de bord */}
          <div className="space-y-4">
            <Dashboard gameState={gameState} />
            <Controls gameState={gameState} />
          </div>
        </div>
      </div>
    </div>
  )
}

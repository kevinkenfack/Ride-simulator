"use client"

import { useState } from "react"
import { Toaster } from "sonner"
import GameCanvas from "./game-canvas"
import CarDashboard from "./car-dashboard"
import Controls from "./controls"
import LoadingScreen from "./loading-screen"
import NotificationSystem from "./notification-system"
import { useGameState } from "@/hooks/use-game-state"
import { useKeyboardControls } from "@/hooks/use-keyboard-controls"

export default function DrivingSimulator() {
  const [isLoading, setIsLoading] = useState(true)
  const gameState = useGameState()
  const { keys } = useKeyboardControls()

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🚗 DRIVE SIMULATOR
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Canvas de jeu - Plus large */}
            <div className="xl:col-span-3">
              <GameCanvas gameState={gameState} keys={keys} />
            </div>

            {/* Panneau de droite */}
            <div className="space-y-6">
              <CarDashboard gameState={gameState} />
              <Controls gameState={gameState} />
            </div>
          </div>

          {/* Barre d'informations en bas */}
          <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{Math.round(gameState.car.speed * 15)}</div>
                <div className="text-xs text-gray-400">km/h</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{Math.round(gameState.car.fuel)}%</div>
                <div className="text-xs text-gray-400">Carburant</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{(gameState.car.distance / 100).toFixed(1)}</div>
                <div className="text-xs text-gray-400">km parcourus</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {Math.round((gameState.car.speed / gameState.car.maxSpeed) * 8000)}
                </div>
                <div className="text-xs text-gray-400">RPM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Système de notifications */}
      <NotificationSystem gameState={gameState} />

      {/* Toast notifications */}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid rgba(75, 85, 99, 0.5)",
            color: "#f9fafb",
          },
        }}
      />
    </>
  )
}

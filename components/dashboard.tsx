"use client"

import type { GameState } from "@/types/game"
import { Gauge, Fuel, Lightbulb, MoveLeftIcon as TurnLeft, MoveRightIcon as TurnRight } from "lucide-react"

interface DashboardProps {
  gameState: GameState
}

export default function Dashboard({ gameState }: DashboardProps) {
  const { car } = gameState

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5" />
        Tableau de Bord
      </h2>

      <div className="space-y-4">
        {/* Vitesse */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">Vitesse</span>
            <span className="text-2xl font-bold text-green-400">{Math.round(car.speed * 15)} km/h</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(car.speed / car.maxSpeed) * 100}%` }}
            />
          </div>
        </div>

        {/* Carburant */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 flex items-center gap-2">
              <Fuel className="w-4 h-4" />
              Carburant
            </span>
            <span className="text-lg font-bold text-blue-400">{Math.round(car.fuel)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${car.fuel}%` }}
            />
          </div>
        </div>

        {/* Distance */}
        <div className="bg-gray-900 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Distance</span>
            <span className="text-lg font-bold text-purple-400">{Math.round(car.distance / 100)} km</span>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`p-3 rounded-lg text-center transition-all ${
              car.headlights ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-400"
            }`}
          >
            <Lightbulb className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Phares</span>
          </div>

          <div
            className={`p-3 rounded-lg text-center transition-all ${
              car.leftSignal ? "bg-orange-500 text-black animate-pulse" : "bg-gray-700 text-gray-400"
            }`}
          >
            <TurnLeft className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Gauche</span>
          </div>

          <div
            className={`p-3 rounded-lg text-center transition-all ${
              car.rightSignal ? "bg-orange-500 text-black animate-pulse" : "bg-gray-700 text-gray-400"
            }`}
          >
            <TurnRight className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Droite</span>
          </div>
        </div>
      </div>
    </div>
  )
}

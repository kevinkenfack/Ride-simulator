"use client"

import type { GameState } from "@/types/game"
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  MoveLeftIcon as TurnLeft,
  MoveRightIcon as TurnRight,
} from "lucide-react"

interface ControlsProps {
  gameState: GameState
}

export default function Controls({ gameState }: ControlsProps) {
  const handleControl = (action: string) => {
    gameState.handleInput(action)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
      <h2 className="text-xl font-bold text-white mb-4">Contrôles</h2>

      {/* Contrôles tactiles */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div></div>
        <button
          onMouseDown={() => handleControl("accelerate")}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <ArrowUp className="w-6 h-6 mx-auto" />
        </button>
        <div></div>

        <button
          onMouseDown={() => handleControl("left")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 mx-auto" />
        </button>

        <button
          onMouseDown={() => handleControl("brake")}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <ArrowDown className="w-6 h-6 mx-auto" />
        </button>

        <button
          onMouseDown={() => handleControl("right")}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <ArrowRight className="w-6 h-6 mx-auto" />
        </button>
      </div>

      {/* Contrôles spéciaux */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          onClick={() => handleControl("leftSignal")}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <TurnLeft className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">Clign. G</span>
        </button>

        <button
          onClick={() => handleControl("headlights")}
          className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <Lightbulb className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">Phares</span>
        </button>

        <button
          onClick={() => handleControl("rightSignal")}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-all active:scale-95"
        >
          <TurnRight className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">Clign. D</span>
        </button>
      </div>

      {/* Instructions clavier */}
      <div className="text-sm text-gray-400 space-y-1">
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">↑/Z</kbd> Accélérer
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">↓/S</kbd> Freiner
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">←/Q</kbd> Gauche
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">→/D</kbd> Droite
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">E</kbd> Phares
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">A</kbd> Clignotant G
        </p>
        <p>
          <kbd className="bg-gray-700 px-2 py-1 rounded">F</kbd> Clignotant D
        </p>
      </div>
    </div>
  )
}

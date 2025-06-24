"use client"

import { useEffect, useRef } from "react"
import type { GameState } from "@/types/game"
import { Gauge } from "lucide-react"

interface CarDashboardProps {
  gameState: GameState
}

export default function CarDashboard({ gameState }: CarDashboardProps) {
  const speedometerRef = useRef<HTMLCanvasElement>(null)
  const rpmRef = useRef<HTMLCanvasElement>(null)
  const fuelRef = useRef<HTMLCanvasElement>(null)
  const tempRef = useRef<HTMLCanvasElement>(null)

  const drawGauge = (
    canvas: HTMLCanvasElement,
    value: number,
    maxValue: number,
    color: string,
    label: string,
    unit = "",
  ) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.strokeStyle = "#374151"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw gauge background arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius - 15, Math.PI * 0.75, Math.PI * 2.25)
    ctx.strokeStyle = "#1f2937"
    ctx.lineWidth = 8
    ctx.stroke()

    // Draw value arc
    const angle = (value / maxValue) * (Math.PI * 1.5) + Math.PI * 0.75
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius - 15, Math.PI * 0.75, angle)
    ctx.strokeStyle = color
    ctx.lineWidth = 8
    ctx.stroke()

    // Draw needle
    const needleAngle = (value / maxValue) * (Math.PI * 1.5) + Math.PI * 0.75
    const needleLength = radius - 25
    const needleX = centerX + Math.cos(needleAngle) * needleLength
    const needleY = centerY + Math.sin(needleAngle) * needleLength

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(needleX, needleY)
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#ef4444"
    ctx.fill()

    // Draw value text
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 16px monospace"
    ctx.textAlign = "center"
    ctx.fillText(`${Math.round(value)}${unit}`, centerX, centerY + 35)

    // Draw label
    ctx.fillStyle = "#9ca3af"
    ctx.font = "12px monospace"
    ctx.fillText(label, centerX, centerY + 55)

    // Draw tick marks
    for (let i = 0; i <= 10; i++) {
      const tickAngle = (i / 10) * (Math.PI * 1.5) + Math.PI * 0.75
      const tickStartRadius = radius - 5
      const tickEndRadius = radius - 15
      const tickStartX = centerX + Math.cos(tickAngle) * tickStartRadius
      const tickStartY = centerY + Math.sin(tickAngle) * tickStartRadius
      const tickEndX = centerX + Math.cos(tickAngle) * tickEndRadius
      const tickEndY = centerY + Math.sin(tickAngle) * tickEndRadius

      ctx.beginPath()
      ctx.moveTo(tickStartX, tickStartY)
      ctx.lineTo(tickEndX, tickEndY)
      ctx.strokeStyle = "#6b7280"
      ctx.lineWidth = 2
      ctx.stroke()
    }
  }

  useEffect(() => {
    if (speedometerRef.current) {
      const speed = gameState.car.speed * 15 // Convert to km/h
      drawGauge(speedometerRef.current, speed, 200, "#10b981", "SPEED", " km/h")
    }
  }, [gameState.car.speed])

  useEffect(() => {
    if (rpmRef.current) {
      const rpm = (gameState.car.speed / gameState.car.maxSpeed) * 8000
      drawGauge(rpmRef.current, rpm, 8000, "#f59e0b", "RPM", "")
    }
  }, [gameState.car.speed, gameState.car.maxSpeed])

  useEffect(() => {
    if (fuelRef.current) {
      drawGauge(fuelRef.current, gameState.car.fuel, 100, "#3b82f6", "FUEL", "%")
    }
  }, [gameState.car.fuel])

  useEffect(() => {
    if (tempRef.current) {
      const temp = 70 + (gameState.car.speed / gameState.car.maxSpeed) * 50
      drawGauge(tempRef.current, temp, 120, "#ef4444", "TEMP", "°C")
    }
  }, [gameState.car.speed, gameState.car.maxSpeed])

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-700 shadow-2xl">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-cyan-400" />
        Tableau de Bord
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Compteur de vitesse */}
        <div className="relative">
          <canvas ref={speedometerRef} width={150} height={150} className="w-full h-auto" />
        </div>

        {/* Compte-tours */}
        <div className="relative">
          <canvas ref={rpmRef} width={150} height={150} className="w-full h-auto" />
        </div>

        {/* Jauge de carburant */}
        <div className="relative">
          <canvas ref={fuelRef} width={150} height={150} className="w-full h-auto" />
        </div>

        {/* Température */}
        <div className="relative">
          <canvas ref={tempRef} width={150} height={150} className="w-full h-auto" />
        </div>
      </div>

      {/* Indicateurs digitaux */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Distance</span>
            <span className="text-cyan-400 font-mono text-lg">{(gameState.car.distance / 100).toFixed(1)} km</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Vitesse Max</span>
            <span className="text-green-400 font-mono text-lg">{Math.round(gameState.car.maxSpeed * 15)} km/h</span>
          </div>
        </div>
      </div>

      {/* Voyants lumineux */}
      <div className="mt-4 flex justify-center gap-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            gameState.car.headlights
              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
              : "bg-gray-800 text-gray-500 border border-gray-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${gameState.car.headlights ? "bg-yellow-400 animate-pulse" : "bg-gray-500"}`}
          />
          PHARES
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            gameState.car.leftSignal
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
              : "bg-gray-800 text-gray-500 border border-gray-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${gameState.car.leftSignal ? "bg-orange-400 animate-pulse" : "bg-gray-500"}`}
          />
          ← CLIGN.
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            gameState.car.rightSignal
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/50"
              : "bg-gray-800 text-gray-500 border border-gray-600"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${gameState.car.rightSignal ? "bg-orange-400 animate-pulse" : "bg-gray-500"}`}
          />
          CLIGN. →
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const loadingSteps = [
    "Initialisation du moteur...",
    "Chargement des textures...",
    "Configuration des contrôles...",
    "Préparation de la route...",
    "Démarrage du véhicule...",
    "Prêt à conduire !",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)

        if (stepIndex < loadingSteps.length) {
          setCurrentStep(loadingSteps[stepIndex])
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => onLoadingComplete(), 500)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center z-50">
      {/* Effet de grille cyberpunk */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500/20 animate-pulse"
              style={{
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Cercles animés */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-cyan-400/30 animate-ping"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Titre */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            DRIVE
          </h1>
          <p className="text-xl text-cyan-300 font-light tracking-wider">SIMULATOR</p>
        </div>

        {/* Barre de progression futuriste */}
        <div className="mb-6">
          <div className="relative">
            <Progress value={progress} className="h-3 bg-gray-800 border border-cyan-500/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />
          </div>
          <div className="flex justify-between text-xs text-cyan-400 mt-2">
            <span>0%</span>
            <span className="font-mono">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Étape actuelle */}
        <div className="mb-8">
          <p className="text-cyan-300 font-mono text-sm animate-pulse">{currentStep}</p>
        </div>

        {/* Indicateurs de statut */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex flex-col items-center">
            <div
              className={`w-2 h-2 rounded-full mb-1 ${progress > 20 ? "bg-green-400" : "bg-gray-600"} animate-pulse`}
            />
            <span className="text-gray-400">ENGINE</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-2 h-2 rounded-full mb-1 ${progress > 60 ? "bg-green-400" : "bg-gray-600"} animate-pulse`}
            />
            <span className="text-gray-400">SYSTEMS</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`w-2 h-2 rounded-full mb-1 ${progress > 90 ? "bg-green-400" : "bg-gray-600"} animate-pulse`}
            />
            <span className="text-gray-400">READY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

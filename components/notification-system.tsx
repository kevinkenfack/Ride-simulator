"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import type { GameState } from "@/types/game"
import { AlertTriangle, Fuel, Zap, CheckCircle, Info } from "lucide-react"

interface NotificationSystemProps {
  gameState: GameState
}

export default function NotificationSystem({ gameState }: NotificationSystemProps) {
  const { car } = gameState

  // Notification de carburant faible
  useEffect(() => {
    if (car.fuel <= 20 && car.fuel > 15) {
      toast.warning("Carburant faible", {
        description: `Il vous reste ${Math.round(car.fuel)}% de carburant`,
        icon: <Fuel className="w-4 h-4" />,
        duration: 3000,
      })
    } else if (car.fuel <= 15 && car.fuel > 10) {
      toast.error("Carburant critique", {
        description: "Trouvez une station-service rapidement !",
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 4000,
      })
    } else if (car.fuel <= 10) {
      toast.error("Panne sèche imminente", {
        description: "Votre véhicule va s'arrêter !",
        icon: <AlertTriangle className="w-4 h-4" />,
        duration: 5000,
      })
    }
  }, [Math.floor(car.fuel / 5)]) // Trigger tous les 5%

  // Notification de vitesse élevée
  useEffect(() => {
    const speed = car.speed * 15
    if (speed > 150) {
      toast.warning("Vitesse excessive", {
        description: `${Math.round(speed)} km/h - Ralentissez !`,
        icon: <Zap className="w-4 h-4" />,
        duration: 2000,
      })
    }
  }, [Math.floor(car.speed)])

  // Notifications d'étapes de distance
  useEffect(() => {
    const distance = Math.floor(car.distance / 100)
    if (distance > 0 && distance % 10 === 0) {
      toast.success("Étape franchie", {
        description: `Vous avez parcouru ${distance} km !`,
        icon: <CheckCircle className="w-4 h-4" />,
        duration: 3000,
      })
    }
  }, [Math.floor(car.distance / 1000)]) // Trigger tous les 10 km

  // Notification de démarrage
  useEffect(() => {
    toast.info("Simulateur démarré", {
      description: "Utilisez les flèches ou ZQSD pour conduire",
      icon: <Info className="w-4 h-4" />,
      duration: 5000,
    })
  }, [])

  // Notification de phares
  useEffect(() => {
    if (car.headlights) {
      toast.info("Phares allumés", {
        description: "Bonne visibilité nocturne",
        icon: <Zap className="w-4 h-4" />,
        duration: 2000,
      })
    }
  }, [car.headlights])

  // Notification de clignotants
  useEffect(() => {
    if (car.leftSignal) {
      toast.info("Clignotant gauche activé", {
        description: "N'oubliez pas de l'éteindre après le virage",
        duration: 2000,
      })
    }
  }, [car.leftSignal])

  useEffect(() => {
    if (car.rightSignal) {
      toast.info("Clignotant droit activé", {
        description: "N'oubliez pas de l'éteindre après le virage",
        duration: 2000,
      })
    }
  }, [car.rightSignal])

  return null // Ce composant ne rend rien visuellement
}

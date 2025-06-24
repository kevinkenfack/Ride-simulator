import type { GameState } from "@/types/game"

export class GameRenderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number
  private particles: Array<{ x: number; y: number; life: number; vx: number; vy: number }> = []

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  render(gameState: GameState) {
    this.clearCanvas()
    this.drawBackground()
    this.drawRoad(gameState.road)
    this.updateParticles(gameState.car)
    this.drawParticles()
    this.drawCar(gameState.car)
    this.drawEffects(gameState.car)
    this.drawHUD(gameState.car)
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  private drawBackground() {
    // Ciel nocturne avec dégradé amélioré
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
    gradient.addColorStop(0, "#0f0f23")
    gradient.addColorStop(0.3, "#1a1a2e")
    gradient.addColorStop(0.7, "#16213e")
    gradient.addColorStop(1, "#0f3460")

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.width, this.height)

    // Étoiles améliorées
    this.ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * this.width
      const y = Math.random() * this.height * 0.4
      const size = Math.random() * 2
      this.ctx.fillRect(x, y, size, size)

      // Effet de scintillement
      if (Math.random() > 0.8) {
        this.ctx.fillStyle = "#87ceeb"
        this.ctx.fillRect(x - 1, y - 1, size + 2, size + 2)
        this.ctx.fillStyle = "#ffffff"
      }
    }

    // Lune
    this.ctx.beginPath()
    this.ctx.arc(this.width - 100, 80, 30, 0, 2 * Math.PI)
    this.ctx.fillStyle = "#f0f0f0"
    this.ctx.fill()
    this.ctx.shadowBlur = 20
    this.ctx.shadowColor = "#f0f0f0"
    this.ctx.fill()
    this.ctx.shadowBlur = 0
  }

  private drawRoad(road: any) {
    // Route principale avec texture
    const roadGradient = this.ctx.createLinearGradient(road.x, 0, road.x + road.width, 0)
    roadGradient.addColorStop(0, "#1a1a1a")
    roadGradient.addColorStop(0.1, "#2a2a2a")
    roadGradient.addColorStop(0.5, "#333333")
    roadGradient.addColorStop(0.9, "#2a2a2a")
    roadGradient.addColorStop(1, "#1a1a1a")

    this.ctx.fillStyle = roadGradient
    this.ctx.fillRect(road.x, 0, road.width, this.height)

    // Bordures de route avec éclairage
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fillRect(road.x - 8, 0, 8, this.height)
    this.ctx.fillRect(road.x + road.width, 0, 8, this.height)

    // Reflets sur les bordures
    this.ctx.fillStyle = "#87ceeb"
    this.ctx.fillRect(road.x - 6, 0, 2, this.height)
    this.ctx.fillRect(road.x + road.width + 2, 0, 2, this.height)

    // Marquages de voie améliorés
    this.ctx.fillStyle = "#ffff00"
    road.laneMarkings.forEach((marking: any) => {
      // Marquage principal
      this.ctx.fillRect(road.x + road.width / 2 - 3, marking.y, 6, 50)

      // Effet de brillance
      this.ctx.fillStyle = "#ffffff"
      this.ctx.fillRect(road.x + road.width / 2 - 1, marking.y + 5, 2, 40)
      this.ctx.fillStyle = "#ffff00"
    })

    // Texture de route (petits points)
    this.ctx.fillStyle = "#404040"
    for (let i = 0; i < 200; i++) {
      const x = road.x + Math.random() * road.width
      const y = Math.random() * this.height
      this.ctx.fillRect(x, y, 1, 1)
    }
  }

  private updateParticles(car: any) {
    // Ajouter des particules d'échappement si la voiture accélère
    if (car.speed > 1) {
      for (let i = 0; i < 2; i++) {
        this.particles.push({
          x: car.x + car.width / 2 + (Math.random() - 0.5) * 20,
          y: car.y + car.height + 5,
          life: 1.0,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1,
        })
      }
    }

    // Mettre à jour les particules existantes
    this.particles = this.particles.filter((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life -= 0.02
      return particle.life > 0
    })
  }

  private drawParticles() {
    this.particles.forEach((particle) => {
      this.ctx.save()
      this.ctx.globalAlpha = particle.life
      this.ctx.fillStyle = "#666666"
      this.ctx.fillRect(particle.x, particle.y, 2, 2)
      this.ctx.restore()
    })
  }

  private drawCar(car: any) {
    const ctx = this.ctx

    // Ombre de la voiture améliorée
    ctx.save()
    ctx.globalAlpha = 0.4
    ctx.fillStyle = "#000000"
    ctx.fillRect(car.x + 3, car.y + 3, car.width, car.height)
    ctx.restore()

    // Carrosserie principale avec dégradé
    const carGradient = ctx.createLinearGradient(car.x, car.y, car.x + car.width, car.y)
    carGradient.addColorStop(0, "#dc2626")
    carGradient.addColorStop(0.5, "#ef4444")
    carGradient.addColorStop(1, "#dc2626")

    ctx.fillStyle = carGradient
    ctx.fillRect(car.x, car.y, car.width, car.height)

    // Reflets sur la carrosserie
    ctx.fillStyle = "#fca5a5"
    ctx.fillRect(car.x + 5, car.y + 5, car.width - 10, 8)

    // Toit
    ctx.fillStyle = "#991b1b"
    ctx.fillRect(car.x + 5, car.y + 15, car.width - 10, 30)

    // Pare-brise avant avec reflet
    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(car.x + 8, car.y + 5, car.width - 16, 15)
    ctx.fillStyle = "#3b82f6"
    ctx.fillRect(car.x + 10, car.y + 7, car.width - 20, 3)

    // Pare-brise arrière
    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(car.x + 8, car.y + car.height - 15, car.width - 16, 10)

    // Roues avec jantes
    ctx.fillStyle = "#000000"
    ctx.fillRect(car.x - 3, car.y + 10, 8, 15)
    ctx.fillRect(car.x + car.width - 5, car.y + 10, 8, 15)
    ctx.fillRect(car.x - 3, car.y + car.height - 25, 8, 15)
    ctx.fillRect(car.x + car.width - 5, car.y + car.height - 25, 8, 15)

    // Jantes
    ctx.fillStyle = "#c0c0c0"
    ctx.fillRect(car.x - 1, car.y + 12, 4, 11)
    ctx.fillRect(car.x + car.width - 3, car.y + 12, 4, 11)
    ctx.fillRect(car.x - 1, car.y + car.height - 23, 4, 11)
    ctx.fillRect(car.x + car.width - 3, car.y + car.height - 23, 4, 11)

    // Phares avant améliorés
    if (car.headlights) {
      ctx.fillStyle = "#fbbf24"
      ctx.fillRect(car.x + 5, car.y - 3, 12, 6)
      ctx.fillRect(car.x + car.width - 17, car.y - 3, 12, 6)

      // Effet de brillance
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(car.x + 7, car.y - 1, 8, 2)
      ctx.fillRect(car.x + car.width - 15, car.y - 1, 8, 2)
    }

    // Feux de freinage
    if (car.speed < 1) {
      ctx.fillStyle = "#dc2626"
      ctx.fillRect(car.x + 5, car.y + car.height, 12, 4)
      ctx.fillRect(car.x + car.width - 17, car.y + car.height, 12, 4)
    }

    // Clignotants améliorés
    if (car.leftSignal) {
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(car.x - 10, car.y + 20, 8, 10)
      ctx.fillStyle = "#fbbf24"
      ctx.fillRect(car.x - 8, car.y + 22, 4, 6)
    }
    if (car.rightSignal) {
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(car.x + car.width + 2, car.y + 20, 8, 10)
      ctx.fillStyle = "#fbbf24"
      ctx.fillRect(car.x + car.width + 4, car.y + 22, 4, 6)
    }
  }

  private drawEffects(car: any) {
    // Effet de phares amélioré
    if (car.headlights) {
      const gradient = this.ctx.createRadialGradient(
        car.x + car.width / 2,
        car.y,
        0,
        car.x + car.width / 2,
        car.y - 150,
        150,
      )
      gradient.addColorStop(0, "rgba(255, 255, 200, 0.4)")
      gradient.addColorStop(0.5, "rgba(255, 255, 200, 0.2)")
      gradient.addColorStop(1, "rgba(255, 255, 200, 0)")

      this.ctx.fillStyle = gradient
      this.ctx.fillRect(car.x - 75, car.y - 150, car.width + 150, 150)
    }

    // Effet de vitesse amélioré
    if (car.speed > 2) {
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
      this.ctx.lineWidth = 1
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * this.width
        const y = Math.random() * this.height
        const length = car.speed * 8
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x, y + length)
        this.ctx.stroke()
      }
    }

    // Effet de turbo à haute vitesse
    if (car.speed > 6) {
      this.ctx.strokeStyle = "rgba(0, 255, 255, 0.3)"
      this.ctx.lineWidth = 2
      for (let i = 0; i < 5; i++) {
        const x = car.x + Math.random() * car.width
        const y = car.y + car.height
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x + (Math.random() - 0.5) * 10, y + 20)
        this.ctx.stroke()
      }
    }
  }

  private drawHUD(car: any) {
    // Affichage de vitesse en grand
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    this.ctx.fillRect(this.width - 150, 20, 130, 60)

    this.ctx.fillStyle = "#00ffff"
    this.ctx.font = "bold 24px monospace"
    this.ctx.textAlign = "center"
    this.ctx.fillText(`${Math.round(car.speed * 15)}`, this.width - 85, 45)

    this.ctx.fillStyle = "#ffffff"
    this.ctx.font = "12px monospace"
    this.ctx.fillText("km/h", this.width - 85, 65)
  }
}

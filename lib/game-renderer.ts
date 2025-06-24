import type { GameState } from "@/types/game"

export class GameRenderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx
    this.width = width
    this.height = height
  }

  render(gameState: GameState) {
    this.clearCanvas()
    this.drawBackground()
    this.drawRoad(gameState.road)
    this.drawCar(gameState.car)
    this.drawEffects(gameState.car)
  }

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  private drawBackground() {
    // Ciel nocturne avec dégradé
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
    gradient.addColorStop(0, "#1a1a2e")
    gradient.addColorStop(1, "#16213e")

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.width, this.height)

    // Étoiles
    this.ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * this.width
      const y = Math.random() * this.height * 0.3
      this.ctx.fillRect(x, y, 1, 1)
    }
  }

  private drawRoad(road: any) {
    // Route principale
    this.ctx.fillStyle = "#2a2a2a"
    this.ctx.fillRect(road.x, 0, road.width, this.height)

    // Bordures de route
    this.ctx.fillStyle = "#ffffff"
    this.ctx.fillRect(road.x - 5, 0, 5, this.height)
    this.ctx.fillRect(road.x + road.width, 0, 5, this.height)

    // Marquages de voie
    this.ctx.fillStyle = "#ffff00"
    road.laneMarkings.forEach((marking: any) => {
      this.ctx.fillRect(road.x + road.width / 2 - 2, marking.y, 4, 40)
    })
  }

  private drawCar(car: any) {
    const ctx = this.ctx

    // Ombre de la voiture
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
    ctx.fillRect(car.x + 2, car.y + 2, car.width, car.height)

    // Carrosserie principale
    ctx.fillStyle = "#dc2626"
    ctx.fillRect(car.x, car.y, car.width, car.height)

    // Toit
    ctx.fillStyle = "#991b1b"
    ctx.fillRect(car.x + 5, car.y + 15, car.width - 10, 30)

    // Pare-brise avant
    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(car.x + 8, car.y + 5, car.width - 16, 15)

    // Pare-brise arrière
    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(car.x + 8, car.y + car.height - 15, car.width - 16, 10)

    // Roues
    ctx.fillStyle = "#000000"
    ctx.fillRect(car.x - 2, car.y + 10, 6, 12)
    ctx.fillRect(car.x + car.width - 4, car.y + 10, 6, 12)
    ctx.fillRect(car.x - 2, car.y + car.height - 22, 6, 12)
    ctx.fillRect(car.x + car.width - 4, car.y + car.height - 22, 6, 12)

    // Phares avant
    if (car.headlights) {
      ctx.fillStyle = "#fbbf24"
      ctx.fillRect(car.x + 5, car.y - 2, 10, 4)
      ctx.fillRect(car.x + car.width - 15, car.y - 2, 10, 4)
    }

    // Feux de freinage
    if (car.speed < 1) {
      ctx.fillStyle = "#dc2626"
      ctx.fillRect(car.x + 5, car.y + car.height, 10, 3)
      ctx.fillRect(car.x + car.width - 15, car.y + car.height, 10, 3)
    }

    // Clignotants
    if (car.leftSignal) {
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(car.x - 8, car.y + 20, 6, 8)
    }
    if (car.rightSignal) {
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(car.x + car.width + 2, car.y + 20, 6, 8)
    }
  }

  private drawEffects(car: any) {
    // Effet de phares
    if (car.headlights) {
      const gradient = this.ctx.createRadialGradient(
        car.x + car.width / 2,
        car.y,
        0,
        car.x + car.width / 2,
        car.y - 100,
        100,
      )
      gradient.addColorStop(0, "rgba(255, 255, 200, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 200, 0)")

      this.ctx.fillStyle = gradient
      this.ctx.fillRect(car.x - 50, car.y - 100, car.width + 100, 100)
    }

    // Effet de vitesse (lignes de mouvement)
    if (car.speed > 2) {
      this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      this.ctx.lineWidth = 2
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * this.width
        const y = Math.random() * this.height
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
        this.ctx.lineTo(x, y + car.speed * 5)
        this.ctx.stroke()
      }
    }
  }
}

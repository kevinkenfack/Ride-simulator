export interface Car {
  x: number
  y: number
  width: number
  height: number
  speed: number
  maxSpeed: number
  acceleration: number
  braking: number
  headlights: boolean
  leftSignal: boolean
  rightSignal: boolean
  fuel: number
  distance: number
}

export interface Road {
  x: number
  width: number
  laneMarkings: Array<{ y: number }>
}

export class GameState {
  car: Car
  road: Road

  constructor() {
    this.car = {
      x: 380,
      y: 500,
      width: 40,
      height: 80,
      speed: 0,
      maxSpeed: 8,
      acceleration: 0.2,
      braking: 0.3,
      headlights: false,
      leftSignal: false,
      rightSignal: false,
      fuel: 100,
      distance: 0,
    }

    this.road = {
      x: 200,
      width: 400,
      laneMarkings: [],
    }

    // Initialiser les marquages de voie
    for (let i = 0; i < 15; i++) {
      this.road.laneMarkings.push({ y: i * 80 })
    }
  }

  update(keys: Record<string, boolean>) {
    // Mise à jour des marquages de voie
    this.road.laneMarkings.forEach((marking) => {
      marking.y += this.car.speed
      if (marking.y > 600) marking.y = -40
    })

    // Contrôles de vitesse
    if (keys["arrowup"] || keys["z"]) {
      this.car.speed = Math.min(this.car.speed + this.car.acceleration, this.car.maxSpeed)
    } else if (keys["arrowdown"] || keys["s"]) {
      this.car.speed = Math.max(this.car.speed - this.car.braking, 0)
    } else {
      this.car.speed *= 0.98
    }

    // Contrôles de direction
    if (keys["arrowleft"] || keys["q"]) {
      this.car.x -= 3
    }
    if (keys["arrowright"] || keys["d"]) {
      this.car.x += 3
    }

    // Limites de la route
    this.car.x = Math.max(this.road.x, Math.min(this.car.x, this.road.x + this.road.width - this.car.width))

    // Mise à jour de la distance et du carburant
    this.car.distance += this.car.speed
    if (this.car.speed > 0) {
      this.car.fuel = Math.max(0, this.car.fuel - 0.01)
    }
  }

  handleInput(action: string) {
    switch (action) {
      case "headlights":
        this.car.headlights = !this.car.headlights
        break
      case "leftSignal":
        this.car.leftSignal = !this.car.leftSignal
        if (this.car.leftSignal) this.car.rightSignal = false
        break
      case "rightSignal":
        this.car.rightSignal = !this.car.rightSignal
        if (this.car.rightSignal) this.car.leftSignal = false
        break
    }
  }
}

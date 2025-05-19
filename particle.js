class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = p5.Vector.random2D();
    this.r = random(3,7)
    this.lifespan = 255;

    // Assign a random color with alpha
    this.color = color(random(255), random(255), random(255), this.lifespan);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2;
  }

  isDead() {
    return this.lifespan < 0;
  }

  draw() {
    this.color.setAlpha(this.lifespan);  // Update alpha to match lifespan
    fill(this.color);
    circle(this.position.x, this.position.y, this.r);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  static createStandardParticleAt(x, y) {
    return new Particle(x, y);
  }
}

class CircleParticle extends Particle {
  draw() {
    this.color.setAlpha(this.lifespan);
    fill(this.color);
    circle(this.position.x, this.position.y, this.r);
  }
}

class SquareParticle extends Particle {
  draw() {
    this.color.setAlpha(this.lifespan);
    fill(this.color);
    rectMode(CENTER);
    square(this.position.x, this.position.y, this.r);
  }
}



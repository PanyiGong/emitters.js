let emitters = [];
let G;
let emitTimer = 0; // Timer to stop emitting after mouse leaves

function setup() {
  createCanvas(400, 600);
  G = createVector(0, 0.1);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(220);

  // Update all emitters
  for (let e of emitters) {
    e.update();
  }
}

class Emitter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.isEmitting = false; // Whether the emitter is emitting
    this.spawnInterval = 5;  // Frames between new particles
    this.frameCount = 0;
    this.emissionTime = 0; // Time to stop emitting after mouse leaves
  }

  update() {
    // Check if mouse is hovering over the emitter
    if (dist(mouseX, mouseY, this.x, this.y) < 50) { // Adjust 50 for trigger radius
      this.isEmitting = true;
      this.emissionTime = millis(); // Record the time when mouse enters the area
    } else if (millis() - this.emissionTime > 500) { // Stop emitting after 3 seconds of no mouse
      this.isEmitting = false;
    }

    // Update and draw particles if emitting
    if (this.isEmitting) {
      this.frameCount++;
      if (this.frameCount % this.spawnInterval === 0) {
        this.particles.push(new Particle(this.x, this.y));
      }
    }

    // Remove dead particles
    this.particles = this.particles.filter(p => !p.isDead());

    // Draw all the live ones
    for (let p of this.particles) {
      p.applyForce(G);
      p.update();
      p.draw();
    }
  }
}

function mouseMoved() {
  // Add a new emitter wherever the mouse moves
  emitters.push(new Emitter(mouseX, mouseY));
}

function mouseClicked() {
  emitters.push( new Emitter(mouseX,mouseY) )
}

let emitters = [];
let G;
let emitTimer = 0;

function setup() {
  createCanvas(400, 600);
  G = createVector(0, 0.1);
  ellipseMode(RADIUS);
  noStroke();
}

function draw() {
  background(220);

  for (let e of emitters) {
    e.update();
  }
}

class Emitter {
  constructor(x, y, type = 'circle') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.particles = [];
    this.isEmitting = false;
    this.spawnInterval = 5;
    this.frameCount = 0;
    this.emissionTime = 0;
  }

  createParticle() {
    switch (this.type) {
      case 'square':
        return new SquareParticle(this.x, this.y);
      case 'circle':
      default:
        return new CircleParticle(this.x, this.y);
    }
  }

  update() {
    if (dist(mouseX, mouseY, this.x, this.y) < 50) {
      this.isEmitting = true;
      this.emissionTime = millis();
    } else if (millis() - this.emissionTime > 500) {
      this.isEmitting = false;
    }

    if (this.isEmitting) {
      this.frameCount++;
      if (this.frameCount % this.spawnInterval === 0) {
        this.particles.push(this.createParticle());
      }
    }

    this.particles = this.particles.filter(p => !p.isDead());

    for (let p of this.particles) {
      p.applyForce(G);
      p.update();
      p.draw();
    }

    
  }
}

// Add emitter on mouse click with alternating particle types
function mouseClicked() {
  let type = random(['circle', 'square']);
  emitters.push(new Emitter(mouseX, mouseY, type));
}

// Optional: also add on mouse move if you want
function mouseMoved() {
  let type = random(['circle', 'square']);
  emitters.push(new Emitter(mouseX, mouseY, type));
}


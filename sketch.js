let emitters = []
let G

function setup() {
  createCanvas(400, 600);

  emitters.push( new Emitter( width/2, 30 ) )
  
  G = createVector(0,0.1)
  ellipseMode(RADIUS)
  noStroke()
}

function draw() {
  background(220);
  for( let e of emitters ) {
    e.update() 
  }
}

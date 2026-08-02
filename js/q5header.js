//  CONFIG
const MAX_SHAPES = 100;
const pallette =  ["b86cc7","ffa8ff","eebd55","b5ffd1","00b894"];
// const mouseSensitivity = 0.25;
const mouseSensitivity =0.1;
const scrollMoveSensitivity = 0;
const scaleAnimDuration = 0.3; //in secs
const moveSpeed = 0.00075;
const maxShapeSize = 500;
const decelleration =0.95;
const initialVelocity = 30; //per sec
const maximumVelcoity = 30; //per sec
//

new Q5("global");

function setup() {
  // canvas = document.getElementById('q5canvas');
  createCanvas(window.innerWidth, window.innerHeight);
}

var shapes = [];

var t = Date.now() / 1000;

var allAnimsDone = false;
var oldScrollY = 0;
var oldMouseX=0, oldMouseY=0;

var velocity = initialVelocity;

const addShape = () => {
  direction = Math.random() * 2 * Math.PI;
  z = 0.1+Math.random()*0.8;
  const shape = {
    x: Math.random(),
    y: Math.random(),
    z,
    dx: Math.cos(direction) * moveSpeed *z,
    dy: Math.sin(direction) * moveSpeed * z,
    color:"#"+pallette[Math.floor(Math.random() * pallette.length)]+'dd',
    t0: t,
    roundedness: Math.random() ,
    ratio: Math.random() < 0.2 ?  0.1+Math.random()*0.9 : 1,
    rot: Math.random() * 2 * Math.PI,
    size:(30 + (1 - z) * maxShapeSize),
  };
  //insert at the right place based on 'z'
    let index = shapes.findIndex(s => s.z > shape.z);
    if (index === -1) {
      shapes.push(shape);
    } else {
      shapes.splice(index, 0, shape);
    }
}

let mouseX = 0, mouseY = 0;
document.onmousemove  = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function draw() {
  const newT = Date.now() / 1000;
  const deltaTime = newT - t;

  if (!glitterInView || !document.hasFocus()) return;

  const scrollY = document.scrollingElement.scrollTop;
  velocity = Math.max(velocity * decelleration, 0);

  velocity = Math.max(velocity, Math.sqrt(Math.pow(mouseX - oldMouseX, 2) + Math.pow(mouseY - oldMouseY, 2))
    * mouseSensitivity);
  velocity += Math.abs(scrollY - oldScrollY) * deltaTime * scrollMoveSensitivity;
  velocity = Math.min(velocity, maximumVelcoity);

  oldMouseX = mouseX;
  oldMouseY = mouseY;


  if (allAnimsDone
    && scrollY === oldScrollY
    && velocity <= 0.1
  ) return;


  background(255);
  if (shapes.length < MAX_SHAPES) {
    addShape();
  }
  // draw shapes
  noStroke();
  // mx = (mouseX - width/2) * mouseSensitivity;
  // my = (mouseY - height/2) * mouseSensitivity;
  mx = 0;
  my = 0;


  shapes.forEach(s => {
    fill(s.color);

    s.x += s.dx * velocity;
    s.y += s.dy * velocity;
    if (s.x < 0 || s.x > 1) s.dx *= -1;
    if (s.y < 0 || s.y > 1) s.dy *= -1;

    age = (t - s.t0); // in secs
    aT = Math.min(age / scaleAnimDuration, 1);
    aY = aT >= 1 ? 1 : (1 - Math.pow(1 - aT, 3) - aT * aT * 0.33333) * 1.5; // bounce(ish)

    size = s.size * aY;

    offsetX = mx * s.z - size / 2;
    offsetY = my * s.z + scrollY * (1 - s.z) - size / 2;

    rect(s.x * width + offsetX, s.y * height + offsetY, size * s.ratio, size, size * s.roundedness);
  });


  allAnimsDone = allAnimsDone || (shapes.length >= MAX_SHAPES && shapes.every(s => (t - s.t0) >= scaleAnimDuration));
  t = newT;
  oldMouseX = mouseX;
  oldMouseY = mouseY;
  oldScrollY = scrollY;
}

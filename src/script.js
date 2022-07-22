const canvass = document.querySelectorAll('canvas');
for (const canvas of canvass) {
  const ctx = canvas.getContext('2d');

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = 300);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomRGB() {
    return `rgba(${random(0, 255)},${random(0, 255)},${random(0, 255)},${random(
      0,
      1
    )})`;
  }

  class Ball {
    constructor(x, y, velX, velY, color, size) {
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      this.color = color;
      this.size = size;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
    }

    update() {
      if (this.x + this.size >= width) {
        this.velX = -this.velX;
      }

      if (this.x - this.size <= 0) {
        this.velX = -this.velX;
      }

      if (this.y + this.size >= height) {
        this.velY = -this.velY;
      }

      if (this.y - this.size <= 0) {
        this.velY = -this.velY;
      }

      this.x += 0.1 * this.velX;
      this.y += 0.1 * this.velY;
    }
  }

  const balls = [];

  while (balls.length < 300) {
    const size = random(0, 1);
    const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
    );

    balls.push(ball);
  }
  function loop() {
    ctx.fillStyle = `${'rgba(10, 2, 4,0.2)'}`;
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
      ball.draw();
      ball.update();
    }

    requestAnimationFrame(loop);
  }
  loop();
}

//3D cube
const aside = document.querySelector('aside');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(aside.clientWidth, aside.clientHeight);
const add = document.body.appendChild(renderer.domElement);

let cube = [];

const loader = new THREE.TextureLoader();
const images = ['images/about2.png'];
for (const image of images) {
  loader.load(`${image}`, (texture) => {
    texture.repeat.set(1, 1);

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    draw();
  });
}

const light = new THREE.AmbientLight('rgb(255,255,255)'); // soft white light
scene.add(light);

/*const spotLight = new THREE.SpotLight('rgb(255,255,255)');
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);*/

function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  cube.rotation.x -= 0.007;
  cube.rotation.y -= 0.007;
  requestAnimationFrame(draw);
}

aside.appendChild(add);

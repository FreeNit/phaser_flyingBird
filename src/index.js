import Phaser from 'phaser';

const config = {
  // -> WebGL (Web Graphic Library) JS API for rendering 2D & 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // -> Arcade physics plugin, manages physics simulation (how velocity, gravity... will be calculated)
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  // -> what we are going to see
  scene: {
    preload: preload, // -> Loading assets, such as images, music, animations ...
    create: create, // -> Initializing instances of the objects on the scene or in the memory (don`t need to display)
    update: update, // -> update function will be called every frame
  },
};

function preload() {
  // * 'this' context -> SCENE
  // * contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

let bird = null;
let totalDelta = null;

function create() {
  // x - 400
  // y - 300
  // key of the image
  // this.add.image(config.width / 2, config.height / 2, 'sky');
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  // Middle 0.5;0.5 are default Origin points for the Image
  // Top - Left corner is 0;0 Origin coordinates
  // Top - Right corner is 1;0 Origin coordinates
  // Bottom - Left corner is 0;1 Origin coordinates
  // Bottom - Right corner is 1;1 Origin coordinates

  // Position the bird at middle of the height and 1/10 width
  bird = this.physics.add
    .sprite(config.width / 10, config.height / 2, 'bird')
    .setOrigin(0, 0);
  // bird.body.gravity.y = 200; // 200 pixels per second

  // bird.body.velocity.x = 200; // Distance over time (200 pixels in 1 second)
}

// -> 60fps update speed (frame per second)
// 60 times per second
// 60 * 16 = 1000ms (16 is delta - time between two updates)
function update(time, delta) {
  //console.log(bird.body.gravity);   // * not changing over time (Distance over time)
  //console.log(bird.body.velocity);  //  * changing over time (change position over time in Y direction)

  if (totalDelta >= 1000) {
    console.log(bird.body.velocity.y);
    // console.log(bird.body.gravity.y);
    totalDelta = 0;
  }

  totalDelta += delta;
}

new Phaser.Game(config);

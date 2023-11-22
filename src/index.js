import Phaser from 'phaser';

const config = {
  // -> WebGL (Web Graphic Library) JS API for rendering 2D & 3D graphics
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    // -> Arcade physics plugin, manages physics simulation (how velocity, gravity... will be calculated)
    default: 'arcade',
  },
  // -> what we are going to see
  scene: {
    preload: preload,
    create: create,
    // update: update,
  },
};

// -> Loading assets, such as images, music, animations ...
function preload() {
  // * 'this' context -> SCENE
  // * contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
}

// -> Initializing instances of the objects on the scene or in the memory (don`t need to display)
function create() {
  // x - 400
  // y - 300
  // key of the image
  this.add.image(config.width / 2, config.height / 2, 'sky');
}

new Phaser.Game(config);

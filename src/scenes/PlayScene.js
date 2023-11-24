import Phaser from 'phaser';

const PIPES_TO_RENDER = 5;

class PlayScene extends Phaser.Scene {
  constructor(config) {
    super('PlayScene');

    this.config = config;

    this.bird = null;
    this.pipes = null;

    this.pipeHorizontalDistance = 0;
    this.pipeVerticalDistanceRange = [150, 250];
    this.pipeHorizontalDistanceRange = [500, 600];
    this.flapVelocity = 250;
  }

  // -> Loading assets, such as images, music, animations ...
  preload() {
    // * 'this' context -> SCENE
    // * contains functions and properties we can use
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
  }
  // -> Initializing instances of the objects on the scene or in the memory (don`t need to display)
  create() {
    this.createBG();
    this.createBird();
    this.createPipes();
    this.handleInputs();
  }

  // -> update function will be called every frame
  // -> 60fps update speed (frame per second)
  update() {
    this.checkGameStatus();
    this.recyclePipes();
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createBird() {
    this.bird = this.physics.add
      .sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
      .setOrigin(0, 0);
    this.bird.body.gravity.y = 400;
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe);
    }

    this.pipes.setVelocityX(-200);
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);

    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  checkGameStatus() {
    if (this.bird.y > this.config.height || this.bird.y < -this.bird.height) {
      this.restartBirdPosition();
    }
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();
    const piperVerticalDistance = Phaser.Math.Between(
      ...this.pipeVerticalDistanceRange
    );
    const pipeVerticalPosition = Phaser.Math.Between(
      0 + 20,
      this.config.height - 20 - piperVerticalDistance
    );
    const pipeHorizontalDistance = Phaser.Math.Between(
      ...this.pipeHorizontalDistanceRange
    );

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + piperVerticalDistance;
  }

  recyclePipes() {
    const tempPipes = [];

    this.pipes.getChildren().forEach((pipe) => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
        }
      }
    });
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
  }

  restartBirdPosition() {
    this.bird.x = this.config.startPosition.x;
    this.bird.y = this.config.startPosition.y;
    this.bird.body.velocity.y = 0;
  }

  flap() {
    this.bird.body.velocity.y = -this.flapVelocity;
  }
}

export default PlayScene;
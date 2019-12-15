import "phaser";
import { MAX_HEALTH, Player } from "../entities/player";

export class GameScene extends Phaser.Scene {
  public scoreText: Phaser.GameObjects.Text;

  public healthpoints: Phaser.GameObjects.Group;
  public asteroids: Phaser.GameObjects.Group;
  public player: Player;
  public atmosphereLimit: Phaser.Physics.Arcade.StaticGroup;

  public asteroidsDestroyed: number;

  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  public preload(): void {
    this.load.image("asteroid", "assets/sprites/asteroid.png");
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("healthpoint", "assets/sprites/heart.png");
    this.load.image("green", "assets/particles/green.png");
  }

  public create(data): void {
    this.asteroidsDestroyed = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "sky");

    this.scoreText = this.add.text(35, 32, "0", { fontSize: "48px", strokeThickness: 3, stroke: "#000" });

    this.healthpoints = this.add.group({
      key: "healthpoint",
      repeat: MAX_HEALTH - 1,
      setXY: { x: 550, y: 32, stepX: 50 },
    } as Phaser.Types.GameObjects.Group.GroupConfig);

    this.healthpoints.getChildren().forEach((el: Phaser.GameObjects.Image) => el.setScale(0.05));
    this.asteroids = this.physics.add.group();

    this.atmosphereLimit = this.physics.add.staticGroup();

    this.atmosphereLimit.create(0, 1100, "ground").setScale(2.1).refreshBody();
    this.player = new Player({
      key: data.containerType,
      scene: this,
      x: 400,
      y: 810,
    });

    this.events.on("healthChanged", (oldHealth: number, newHealth: number) => {
      if (newHealth === 0) {
        this.goToGameOverScene();
      }
      const healthpointsScheme: boolean[] = Array(MAX_HEALTH);

      let emptyHealthpoints: number = MAX_HEALTH - newHealth;

      for (let i = 0; i < MAX_HEALTH; i++) {
        if (emptyHealthpoints) {
          healthpointsScheme[i] = false;
          emptyHealthpoints--;
        } else {
          healthpointsScheme[i] = true;
        }
      }

      let index: number = 0;

      this.healthpoints.children.iterate((healthpoint: Phaser.GameObjects.Sprite) => {
        healthpoint.visible = healthpointsScheme[index++];
      });
    });

    this.physics.add.overlap(this.atmosphereLimit, this.asteroids, this.missAsteroid, null, this);
    this.spawnAsteroids();
  }

  public update(): void {
    if (this.cursors.left.isDown) {
      this.player.goLeft();
    } else if (this.cursors.right.isDown) {
      this.player.goRight();
    } else {
      this.player.standStill();
    }
  }

  public spawnAsteroids(): void {
    this.spawnAsteroid(Phaser.Math.Between(100, 700), -100);
    this.queueSpawn(Phaser.Math.Between(1000, 1500), this.spawnAsteroids);
  }

  public queueSpawn(time: number, spawner: () => void): void {
    this.time.addEvent({ delay: time, callback: spawner, callbackScope: this });
  }

  public spawnAsteroid(x: number, y: number) {
    this.asteroids.create(x, y, "asteroid").setScale(0.5);
  }

  public destroyAsteroid(player, asteroid) {
    if (!asteroid.visible) { return; }

    asteroid.disableBody(true, true);
    this.asteroidsDestroyed++;
    this.scoreText.setText(this.asteroidsDestroyed.toString());
  }

  public missAsteroid(atmosphereLimit, asteroid) {
    if (!asteroid.visible) { return; }

    asteroid.disableBody(true, true);
    this.player.health--;
  }

  public goToGameOverScene(): void {
    this.scene.start("GameOverScene");
  }

}

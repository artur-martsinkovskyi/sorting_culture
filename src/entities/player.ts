import "phaser";
import { GameScene } from "../scenes/gameScene";

export const MAX_HEALTH = 5;

export class Player extends Phaser.GameObjects.Image {
  private ownHealth: number;

  public get health(): number {
    return this.ownHealth;
  }

  public set health(value: number) {
    if (value === this.ownHealth) { return; }
    this.ownHealth = value;
    this.scene.events.emit("healthChanged", value, this.health);
  }

  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.init();
    this.scene.add.existing(this);
  }

  public goLeft(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-300);
  }

  public goRight(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(300);
  }

  public standStill(): void {
    (this.body as Phaser.Physics.Arcade.Body).setVelocityX(0);
  }

  private init(): void {
    this.scene.physics.world.enable(this);
    this.ownHealth = MAX_HEALTH;

    const player = this;

    this.scene.physics.add.overlap(
      this,
      (this.scene as GameScene).asteroids,
      (this.scene as GameScene).destroyAsteroid,
      null,
      this.scene,
    );

    this.setScale(0.1);
    (this.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);
    this.scene.physics.add.collider(this, (this.scene as GameScene).atmosphereLimit);
  }
}

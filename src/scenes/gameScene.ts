import "phaser";
import { TRASH, TRASH_GROUPS } from "../constants/trash";
import { MAX_HEALTH, Player } from "../entities/player";

export class GameScene extends Phaser.Scene {
  public scoreText: Phaser.GameObjects.Text;

  public healthpoints: Phaser.GameObjects.Group;
  public trash: Phaser.GameObjects.Group;
  public player: Player;
  public atmosphereLimit: Phaser.Physics.Arcade.StaticGroup;

  public correctTrashCaught: number;

  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({
      key: "GameScene",
    });
  }

  public preload(): void {
    for (const trashType in TRASH_GROUPS) {
      if (Object.prototype.hasOwnProperty.call(TRASH_GROUPS, trashType)) {
        TRASH_GROUPS[trashType].forEach(
          (trash) => {
            const path = "assets/sprites/" + trashType + "/" + trash + ".png";
            this.load.image(trash, path);
          },
        );
      }
    }
    this.load.image("ground", "assets/sprites/ground.png");
    this.load.image("healthpoint", "assets/sprites/heart.png");
    this.load.image("green", "assets/particles/green.png");
  }

  public create(data): void {
    this.correctTrashCaught = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, "sky");

    this.scoreText = this.add.text(35, 32, "0", { fontSize: "48px", strokeThickness: 3, stroke: "#000" });

    this.healthpoints = this.add.group({
      key: "healthpoint",
      repeat: MAX_HEALTH - 1,
      setXY: { x: 550, y: 32, stepX: 50 },
    } as Phaser.Types.GameObjects.Group.GroupConfig);

    this.healthpoints.getChildren().forEach((el: Phaser.GameObjects.Image) => el.setScale(0.05));
    this.trash = this.physics.add.group();

    this.atmosphereLimit = this.physics.add.staticGroup();

    this.atmosphereLimit.create(0, 1100, "ground").setScale(2.1).refreshBody();
    this.player = new Player({
      containerType: data.containerType,
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

    this.physics.add.overlap(this.atmosphereLimit, this.trash, this.missTrash, null, this);
    this.spawnTrashEntries();
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

  public spawnTrashEntries(): void {
    this.spawnTrash(Phaser.Math.Between(100, 700), -100);
    this.queueSpawn(Phaser.Math.Between(1000, 1500), this.spawnTrashEntries);
  }

  public queueSpawn(time: number, spawner: () => void): void {
    this.time.addEvent({ delay: time, callback: spawner, callbackScope: this });
  }

  public spawnTrash(x: number, y: number) {
    const randomTrash = Object.keys(TRASH)[Math.floor(Math.random() * Object.keys(TRASH).length)];
    this.trash.create(x, y, randomTrash).setScale(0.03);
  }

  public catchTrash(player, trash) {
    if (!trash.visible) { return; }

    trash.disableBody(true, true);
    if (TRASH[trash.texture.key] === this.player.containerType) {
      this.correctTrashCaught++;
    } else {
      this.player.health--;
    }
    this.scoreText.setText(this.correctTrashCaught.toString());
  }

  public missTrash(atmosphereLimit, trash) {
    if (!trash.visible) { return; }
    if (TRASH[trash.texture.key] === this.player.containerType) {
      this.player.health--;
    }

    trash.disableBody(true, true);
  }

  public goToGameOverScene(): void {
    this.scene.start("GameOverScene", { score: this.correctTrashCaught });
  }

}

import "phaser";
import { TRASH, TRASH_GROUPS } from "../constants/trash";

export class WelcomeScene extends Phaser.Scene {
  public title: Phaser.GameObjects.Text;
  public promptText: Phaser.GameObjects.Text;

  public startGameKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "WelcomeScene",
    });
  }

  public preload(): void {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    this.load.on("progress", (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
    });

    this.load.image("sky", "assets/sprites/sky.png");
    this.load.image("glass", "assets/sprites/containers/glass.png");
    this.load.image("paper", "assets/sprites/containers/paper.png");
    this.load.image("organic", "assets/sprites/containers/organic.png");
    this.load.image("metal", "assets/sprites/containers/metal.png");
    this.load.image("glass_instruction", "assets/sprites/instructions/glass.png");
    this.load.image("paper_instruction", "assets/sprites/instructions/paper.png");
    this.load.image("organic_instruction", "assets/sprites/instructions/organic.png");
    this.load.image("metal_instruction", "assets/sprites/instructions/metal.png");

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

  public create(): void {
    this.add.image(400, 300, "sky");

    this.title = this.add.text(115, 100, "SORTING\nCULTURE", { fontSize: "120px", strokeThickness: 3, stroke: "#000" });
    this.promptText = this.add.text(
      140,
      400,
      "Натисніть ENTER щоб почати...",
      { fontSize: "30px", strokeThickness: 3, stroke: "#000" },
    );

    this.startGameKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  public update(): void {
    if (this.startGameKey.isDown) {
      this.goToContainerChoiceScene();
    }
  }

  public goToContainerChoiceScene(): void {
    this.scene.start("ContainerChoiceScene");
  }
}

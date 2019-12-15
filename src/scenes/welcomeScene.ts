import "phaser";

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
    this.load.image("sky", "assets/sprites/sky.png");
  }

  public create(): void {
    this.add.image(400, 300, "sky");

    this.title = this.add.text(115, 100, "SORTING\nCULTURE", { fontSize: "120px", strokeThickness: 3, stroke: "#000" });
    this.promptText = this.add.text(210, 400, "Press ENTER to start...", { fontSize: "30px", strokeThickness: 3, stroke: "#000" });

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

import "phaser";

export class GameOverScene extends Phaser.Scene {
  public title: Phaser.GameObjects.Text;
  public scoreText: Phaser.GameObjects.Text;
  public restartGameKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "GameOverScene",
    });
  }

  public create(data): void {
    this.add.image(400, 300, "sky");

    this.title = this.add.text(240, 100, "GAME OVER", { fontSize: "60px", strokeThickness: 3, stroke: "#000" });
    this.scoreText = this.add.text(400, 400, "БАЛИ: " + data.score, { fontSize: "60px", strokeThickness: 3, stroke: "#000" });
    this.restartGameKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  public update(): void {
    if (this.restartGameKey.isDown) {
      this.goToContainerChoiceScene();
    }
  }

  public goToContainerChoiceScene(): void {
    this.scene.start("ContainerChoiceScene");
  }
}

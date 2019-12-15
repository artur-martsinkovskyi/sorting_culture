import "phaser";

export class GameOverScene extends Phaser.Scene {
  public title: Phaser.GameObjects.Text;
  public startGameKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "GameOverScene",
    });
  }

  public create(): void {
    this.add.image(400, 300, "sky");

    this.title = this.add.text(115, 100, "GAME OVER", { fontSize: "60px", strokeThickness: 3, stroke: "#000" });

    this.startGameKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  public update(): void {
    if (this.startGameKey.isDown) {
      this.goToGameScene();
    }
  }

  public goToGameScene(): void {
    this.scene.start("GameScene");
  }
}

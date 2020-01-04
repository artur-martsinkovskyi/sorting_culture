import "phaser";

export class InstructionScene extends Phaser.Scene {
  public nextKey: Phaser.Input.Keyboard.Key;
  public containerType: string;

  constructor() {
    super({
      key: "InstructionScene",
    });
  }

  public create(data): void {
    this.nextKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.containerType = data.containerType;
    this.add.sprite(
      400,
      300,
      this.containerType + "_instruction",
    ).setScale(0.34);
    }

  public update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.nextKey)) {
      this.goToNext();
    }
  }

  public goToNext(): void {
    this.scene.start("GameScene", { containerType: this.containerType });
  }
}

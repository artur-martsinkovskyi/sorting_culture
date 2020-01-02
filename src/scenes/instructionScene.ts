import "phaser";

export class InstructionScene extends Phaser.Scene {
  public nextKey: Phaser.Input.Keyboard.Key;
  public instructions: string[];
  public currentInstructionIndex: number;
  public currentInstruction: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "InstructionScene",
    });
  }

  public create(data): void {
    this.nextKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.instructions = [
      "metal_instruction",
      "glass_instruction",
      "organic_instruction",
      "paper_instruction",
    ];
    this.currentInstructionIndex = 0;
    this.currentInstruction = this.add.sprite(400, 300, this.instructions[this.currentInstructionIndex]);
    this.currentInstruction.setScale(0.34);
  }

  public update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.nextKey)) {
      this.goToNext();
    }
  }

  public goToNext(): void {
    if (this.currentInstructionIndex < this.instructions.length - 1) {
      this.currentInstruction.setTexture(this.instructions[++this.currentInstructionIndex]);
    } else {
      this.scene.start("ContainerChoiceScene");
    }
  }
}

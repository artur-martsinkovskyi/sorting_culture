import "phaser";

const GLASS = "glass";
const PAPER = "paper";
const ORGANIC = "organic";
const METAL = "metal";
const CONTAINER_TYPES = [
  GLASS,
  PAPER,
  ORGANIC,
  METAL,
];
const TRANSLATIONS = {
  [GLASS]:   "  Скло",
  [PAPER]:   "  Папір",
  [ORGANIC]: "Органіка",
  [METAL]:   " Метал",
};

export class ContainerChoiceScene extends Phaser.Scene {
  public title: Phaser.GameObjects.Text;
  public containerTitle: Phaser.GameObjects.Text;
  public startGameKey: Phaser.Input.Keyboard.Key;
  public container: Phaser.GameObjects.Sprite;
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public currentContainerIndex: integer = 0;

  constructor() {
    super({
      key: "ContainerChoiceScene",
    });
  }

  public create(): void {
    this.add.image(400, 300, "sky");
    this.container = this.add.sprite(400, 350, "glass");

    this.containerTitle = this.add.text(
      300,
      460,
      TRANSLATIONS[
        CONTAINER_TYPES[
          this.currentContainerIndex
        ]
      ],
      { fontSize: "40px", strokeThickness: 3, stroke: "#000" },
    );
    this.container.setScale(0.07);

    this.add.text(
      250,
      460,
      "<",
      { fontSize: "40px", strokeThickness: 3, stroke: "#000" },
    );

    this.add.text(
      535,
      460,
      ">",
      { fontSize: "40px", strokeThickness: 3, stroke: "#000" },
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.title = this.add.text(
      30,
      100,
      "ВИБЕРІТЬ СВІЙ ТИП КОНТЕЙНЕРА",
      { fontSize: "35px", strokeThickness: 3, stroke: "#000" },
    );
    this.startGameKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  public update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      if (this.currentContainerIndex === 0) {
        this.currentContainerIndex = CONTAINER_TYPES.length - 1;
      } else {
        this.currentContainerIndex--;
      }
      this.container.setTexture(CONTAINER_TYPES[this.currentContainerIndex]);
      this.containerTitle.setText(
        TRANSLATIONS[
          CONTAINER_TYPES[
            this.currentContainerIndex
          ]
        ],
      );
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      if (this.currentContainerIndex === CONTAINER_TYPES.length - 1) {
        this.currentContainerIndex = 0;
      } else {
        this.currentContainerIndex++;
      }
      this.container.setTexture(CONTAINER_TYPES[this.currentContainerIndex]);
      this.containerTitle.setText(
        TRANSLATIONS[
          CONTAINER_TYPES[
            this.currentContainerIndex
          ]
        ],
      );
    } else if (this.startGameKey.isDown) {
      this.goToGameScene();
    }

  }

  public goToGameScene(): void {
    this.scene.start("GameScene", { containerType: CONTAINER_TYPES[this.currentContainerIndex] });
  }
}

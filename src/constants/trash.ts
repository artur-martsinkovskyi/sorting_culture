export const TRASH_GROUPS = {
  glass: [
    "bottle",
    "bottle2",
    "perfume",
    "wineglass",
  ],
  metal: [
    "can",
    "foil",
    "nut",
    "bin",
    "cap",
    "fish_can",
  ],
  organic: [
    "apple",
    "broccoli",
    "carrots",
    "pear",
  ],
  paper: [
    "bill",
    "box",
    "business card",
    "copybook",
    "newspaper",
  ],
};

export const TRASH = Object.keys(TRASH_GROUPS).map(
  (trashType): object => {
    return TRASH_GROUPS[trashType].reduce(
      (memo, trashEntry) => {
        memo[trashEntry] = trashType;
        return memo;
      },
      {},
    );
  },
).reduce((memo, el) => ({ ...memo, ...el}));


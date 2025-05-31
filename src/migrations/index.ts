import * as migration_20250530_124340 from "./20250530_124340";

export const migrations = [
  {
    up: migration_20250530_124340.up,
    down: migration_20250530_124340.down,
    name: "20250530_124340",
  },
];

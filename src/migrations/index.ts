import * as migration_20250520_123024 from "./20250520_123024";

export const migrations = [
  {
    up: migration_20250520_123024.up,
    down: migration_20250520_123024.down,
    name: "20250520_123024",
  },
];

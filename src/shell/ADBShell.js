import { Command } from "@tauri-apps/plugin-shell";

class ADBShell {
  constructor() {}

  async devices() {
    const cmd = await Command.create("adb", ["devices"]);

    const output = await cmd.execute();

    return output.stdout;
  }
}

const adbShell = new ADBShell();

export { adbShell };

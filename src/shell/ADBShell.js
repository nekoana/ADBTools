import { Command } from "@tauri-apps/plugin-shell";
import { platform } from "@tauri-apps/plugin-os";

class ADBShell {
  constructor() {}

  async devices() {
    const cmd = await Command.create("adb", ["devices"]);

    const output = await cmd.execute();

    const lines = output.stdout
      .split("\n")
      .slice(1)
      .filter((line) => line.length > 0);

    const devices = lines.map((line) => {
      return line.split("\t").shift();
    });

    return devices;
  }

  async execute(device, cmdModel, onData, onError, onClose) {
    const args = ["-s", device];

    args.push(...cmdModel.command.split(" "));

    console.log("adb shell args:", args);

    const command = await Command.create("adb", args);

    command.on("close", onClose);
    command.on("error", onError);

    command.stdout.on("data", onData);
    command.stderr.on("data", onData);

    const pid = await command.spawn();

    return pid;
  }

  async kill(pid) {
    if (pid) {
      await pid.kill();
    }
  }
}

const adbShell = new ADBShell();

export { adbShell };

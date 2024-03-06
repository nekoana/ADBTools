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
    const args = ["-s", device, cmdModel.command];
    
    const command = await Command.create("adb", args);

    command.on("close", onClose);
    command.on("error", onError);

    command.stdout.on("data", onData);
    command.stderr.on("data", onData);

    const pid = await command.spawn();

    return pid;
  }

  /**
   * @param {pid} pid  The process id to kill
   */
  async kill(pid) {
    if (!pid) {
      return;
    }

    const platform = await platform();

    let killer;
    let args;

    switch (platform) {
      case "windows":
        killer = "taskkill";
        args = ["/pid", pid, "/f"];
        break;
      case "macos":
        killer = "kill";
        args = [pid];
        break;
    }

    if (args && killer) {
      const command = await Command.create(killer, args);
      await command.execute();
    }
  }
}

const adbShell = new ADBShell();

export { adbShell };

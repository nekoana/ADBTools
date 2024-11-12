import { Child, Command, TerminatedPayload } from "@tauri-apps/plugin-shell";
import CmdModel from "@/database/Database";

class ADBShell {
  private constructor() {}

  static async devices() {
    const cmd = Command.create("adb", ["devices"]);

    const output = await cmd.execute();

    const lines = output.stdout
      .split("\n")
      .slice(1)
      .filter((line) => line.length > 0);

    return lines
      .map((line) => line.split("\t").shift())
      .filter((line) => line !== undefined);
  }

  static async execute(
    device: string,
    cmdModel: CmdModel,
    onData: (arg: string) => void,
    onError: (arg: string) => void,
    onClose: (arg: TerminatedPayload) => void,
  ) {
    const args = ["-s", device];

    args.push(...cmdModel.command.split(" "));

    console.log("adb shell args:", args);

    const command = Command.create("adb", args);

    command.on("close", onClose);
    command.on("error", onError);

    command.stdout.on("data", onData);
    command.stderr.on("data", onData);

    return await command.spawn();
  }

  static async kill(pid: Child | undefined) {
    if (pid) {
      await pid.kill();
    }
  }
}
export default ADBShell;

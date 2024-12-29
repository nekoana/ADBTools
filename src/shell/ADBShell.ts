import { Child, Command, TerminatedPayload } from "@tauri-apps/plugin-shell";
import { Cmd } from "@/model/Cmd";

class ADBShell {
  static async devices() {
    const cmd = Command.create("adb", ["devices"]);
    const output = await cmd.execute();

    return output.stdout
      .split("\n")
      .slice(1)
      .filter((line) => line.length > 0)
      .map((line) => line.split("\t")[0])
      .filter((line) => line !== undefined);
  }

  static async execute(
    cmd: Cmd,
    device: string | null,
    onData: (arg: string) => void,
    onError: (arg: string) => void,
    onClose: (arg: TerminatedPayload) => void,
  ) {
    const args = device
      ? ["-s", device, ...cmd.command.split(" ")]
      : cmd.command.split(" ");
    const command = Command.create("adb", args);

    command.on("close", onClose);
    command.on("error", onError);
    command.stdout.on("data", onData);
    command.stderr.on("data", onData);

    console.log("execute", cmd, device);

    return await command.spawn();
  }

  static async executeAll(cmd: Cmd, devices: string[]) {
    const rets: {
      [key: string]: {
        data: string;
        error: string;
      };
    } = {};

    for (let device of devices) {
      const promise = new Promise<{ data: string; error: string }>(
        (resolve, reject) => {
          const ret = {
            data: "",
            error: "",
          };

          const onData = (data: string) => {
            ret["data"] += data;
          };
          const onError = (data: string) => {
            ret["error"] += data;
          };
          const onClose = (data: TerminatedPayload) => {
            resolve(ret);
          };
          ADBShell.execute(cmd, device, onData, onError, onClose);
        },
      );
      rets[device] = await promise;
    }

    console.log("executeAll", rets);

    return rets;
  }

  static async kill(pid: Child | null) {
    if (pid) {
      await pid.kill();
    }
  }
}

export default ADBShell;

import Shell from "@/app/shell/shell";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import Link from "next/link";

check().then((update) => {
  if (update?.available) {
    update.downloadAndInstall().then(() => {
      relaunch().then(() => {
        console.log("Relaunched!");
      });
    });
  }
});

export default function Home() {
  return (
    <>
      <Link href="/shell">Shell</Link>
    </>
  );
}

import Shell from "@/app/shell";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

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
    <div className="mx-auto p-4 grid [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))] gap-4">
      <Shell />
    </div>
  );
}

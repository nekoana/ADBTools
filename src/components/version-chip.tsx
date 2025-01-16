import React from "react";
import { getVersion } from "@tauri-apps/api/app";
import { Chip } from "@nextui-org/react";

function VersionChip() {
  const [version, setVersion] = React.useState<string | null>(null);
  React.useEffect(() => {
    getVersion().then((v) => {
      setVersion(v);
    });
  }, []);

  return (
    <Chip className="bg-color-background shadow cursor-default" radius="full">
      <span className="text-sm">V: {version}</span>
    </Chip>
  );
}

export default VersionChip;

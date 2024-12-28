import { Button, Image } from "@nextui-org/react";
import React from "react";

function WindowControl({
  onClose,
  onMinimize,
}: {
  onClose: () => void;
  onMinimize: () => void;
}) {
  return (
    <div className="flex flex-row">
      <Button
        radius="full"
        isIconOnly
        className="bg-transparent hover:shadow-inner"
        onClick={onMinimize}
      >
        <Image width={20} height={20} src="mini.svg" alt="minimize" />
      </Button>
      <Button
        radius="full"
        className="bg-transparent hover:shadow-inner"
        isIconOnly
        onClick={onClose}
      >
        <Image width={20} height={20} src="close.svg" alt="close" />
      </Button>
    </div>
  );
}

export default WindowControl;

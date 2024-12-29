import { CmdForm } from "./cmd-form";
import { useRef } from "react";
import { Button, Image } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import { Cmd } from "@/model/Cmd";

function NewCmdDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (cmd: Cmd) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={open}
      onClose={onClose}
      className="bg-color-background"
      classNames={{
        closeButton: "bg-transparent hover:shadow-inner",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h2>New Command</h2>
        </ModalHeader>
        <ModalBody>
          <CmdForm ref={formRef} onSubmit={onSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button
            isIconOnly
            radius="full"
            className="bg-transparent hover:shadow-inner"
            onClick={() => handleSubmit()}
          >
            <Image src="save.svg" className="p-2" />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewCmdDialog;

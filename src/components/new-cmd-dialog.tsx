import { CmdForm } from "./cmd-form";
import CmdModel from "@/database/Database";
import { useRef } from "react";
import { Button } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

function NewCmdDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (cmd: CmdModel) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2>New Command</h2>
        </ModalHeader>
        <ModalBody>
          <CmdForm onSubmit={onSubmit} />
        </ModalBody>
        <ModalFooter>
          <Button
            radius="full"
            variant="flat"
            className="bg-color-on-primary hover:shadow-inner transition-all"
            onClick={handleSubmit}
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewCmdDialog;

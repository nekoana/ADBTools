import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import DeviceList from "./device-list";
import ConsoleArea from "./console-area";
import ADBShell from "@/shell/ADBShell";
import { CmdForm } from "@/app/shell/components/cmd-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";
import { Child } from "@tauri-apps/plugin-shell";
import useDevices from "@/hooks/useDevices";
import useExecute from "@/hooks/useExecute";
import { Cmd } from "@/model/Cmd";

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

function EditCmdDialog({
  cmd,
  onCloseRequest,
  onSaveRequest,
  onDeleteRequest,
}: {
  cmd: Cmd | null;
  onCloseRequest: () => void;
  onSaveRequest: (newModel: Cmd) => void;
  onDeleteRequest: (cmd: Cmd) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const devices = useDevices();
  const [newCmd, setNewCmd] = useState(
    cmd ?? {
      title: "",
      description: "",
      command: "",
      keywords: "",
    },
  );
  const [device, setDevice] = useState<string | null>("");
  const { status, execute } = useExecute();

  const isChanged = useMemo(() => {
    return !deepEqual(cmd, newCmd);
  }, [cmd, newCmd]);

  if (!cmd) {
    return <></>;
  }

  return (
    <Modal
      isOpen={true}
      backdrop="blur"
      onClose={onCloseRequest}
      size="sm"
      isDismissable
      className="bg-color-background"
      classNames={{
        closeButton: "bg-transparent hover:shadow-inner",
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h2>Edit Command</h2>
        </ModalHeader>
        <ModalBody>
          <CmdForm
            defaultCmd={newCmd}
            onChanged={setNewCmd}
            onSubmit={onSaveRequest}
            ref={formRef}
          >
            <DeviceList devices={devices} onSelected={setDevice} />
          </CmdForm>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full">
            <div className="flex-1">
              <Button
                isIconOnly
                radius="full"
                className="bg-transparent hover:shadow-inner"
                onClick={() => {
                  onDeleteRequest(newCmd);
                }}
              >
                <Image src="delete.svg" className="p-2" />
              </Button>
            </div>

            <Button
              isIconOnly
              radius="full"
              isDisabled={!isChanged}
              className="bg-transparent hover:shadow-inner"
              onClick={() => onSaveRequest(newCmd)}
            >
              <Image src="save.svg" className="p-2" />
            </Button>

            <Button
              isIconOnly
              isLoading={status.isExecuting}
              radius="full"
              className="bg-transparent hover:shadow-inner"
              onClick={() => {
                execute(device, newCmd);
              }}
            >
              <Image src="execute.svg" className="p-2" />
            </Button>
            <ConsoleArea text={status.output} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCmdDialog;

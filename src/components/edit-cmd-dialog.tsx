import { FormEvent, useEffect, useReducer, useRef } from "react";
import DeviceList from "./device-list";
import ConsoleArea from "./console-area";
import CmdModel from "@/database/Database";
import ADBShell from "@/shell/ADBShell";
import { CmdForm } from "@/components/cmd-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";

type State = {
  oldCmd: CmdModel;
  newCmd: CmdModel;
  changed: boolean;
  devices: string[];
  selected: string;
};

type Action = {
    type: "setNewCmd";
    payload: CmdModel;
    } | {
    type: "setDevices";
    payload: string[];
    } | {
    type: "setSelected";
    payload: string;
}

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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setNewCmd": {
      const newCmd = action.payload;
      return {
        ...state,
        newCmd,
        changed: !deepEqual(state.oldCmd, newCmd),
      };
    }
    case "setDevices": {
      const devices = action.payload;
      let selected = state.selected;
      if (devices.length > 0) {
        selected = devices[0];
      }
      return {
        ...state,
        selected:selected,
        devices: action.payload,
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload,
      };
    }
  }
}

function EditCmdDialog({
  open,
  output,
  cmd,
  isExecuting,
  onClearRequest,
  onCloseRequest,
  onSaveRequest,
  onDeleteRequest,
  onExecuteRequest,
}: {
  open: boolean;
  output: string;
  cmd: CmdModel;
  isExecuting: boolean;
  onClearRequest: () => void;
  onCloseRequest: () => void;
  onSaveRequest: (newModel: CmdModel) => void;
  onDeleteRequest: (cmd: CmdModel) => void;
  onExecuteRequest: (device: string, cmd: CmdModel) => void;
}) {
  const [state, dispatch] = useReducer(reducer, {
    oldCmd: cmd,
    newCmd: cmd,
    changed: false,
    devices: [],
    selected: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleChanged = (cmd: CmdModel) => {
    dispatch({ type: "setNewCmd", payload: cmd });
  };

  const handleSelected = (device: string) => {
    dispatch({ type: "setSelected", payload: device });
  };

  const handleExecute = () => {
    onExecuteRequest(state.selected, state.newCmd);
  };

  const handleDelete = () => {
    onDeleteRequest(state.newCmd);
  };

  const handleSave = () => {
    onSaveRequest(state.newCmd);
  };

  const fetchDevices = async () => {
    const devices = await ADBShell.devices();
    dispatch({
      type: "setDevices",
      payload: devices,
    });
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <Modal isOpen={open} onClose={onCloseRequest} size="sm" isDismissable>
      <ModalContent>
        <ModalHeader>
          <h2>Edit Command</h2>
        </ModalHeader>
        <ModalBody>
          <CmdForm
            defaultCmd={state.newCmd}
            onChanged={handleChanged}
            onSubmit={onSaveRequest}
            ref={formRef}
          >
            <DeviceList
              devices={state.devices}
              selected={state.selected}
              onSelected={handleSelected}
            />
          </CmdForm>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row">
            {state.changed && (
              <Button
                isIconOnly
                radius="full"
                className="bg-transparent hover:shadow-inner"
                onClick={handleSave}
              >
                <Image src="save.svg" className="p-2" />
              </Button>
            )}

            <Button
              isIconOnly
              radius="full"
              className="bg-transparent hover:shadow-inner"
              onClick={handleDelete}
            >
              <Image src="delete.svg" className="p-2" />
            </Button>

            <Button
              isIconOnly
              isLoading={isExecuting}
              radius="full"
              className="bg-transparent hover:shadow-inner"
              onClick={handleExecute}
            >
              <Image src="execute.svg" className="p-2" />
            </Button>
            <ConsoleArea text={output} onClear={onClearRequest} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCmdDialog;

import { useEffect, useReducer, useRef } from "react";
import DeviceList from "./device-list";
import ConsoleArea from "./console-area";
import { Cmd } from "@/database/AdbDatabase";
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
import { Child } from "@tauri-apps/plugin-shell";

type State = {
  oldCmd: Cmd;
  newCmd: Cmd;
  changed: boolean;
  devices: string[];
  selected: string;
  output: string;
  executing: boolean;
};

type Action =
  | {
      type: "setNewCmd";
      payload: Cmd;
    }
  | {
      type: "setDevices";
      payload: string[];
    }
  | {
      type: "setSelected";
      payload: string;
    }
  | {
      type: "setAdbOutput";
      payload: string;
    }
  | {
      type: "setExecuting";
      payload: boolean;
    };

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
      return {
        ...state,
        devices: action.payload,
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload,
      };
    }
    case "setAdbOutput":
      return {
        ...state,
        output: state.output + action.payload,
      };
    case "setExecuting":
      return {
        ...state,
        executing: action.payload,
      };
  }
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

  const pid = useRef<Child | null>(null);

  const handleChanged = (cmd: Cmd) => {
    dispatch({ type: "setNewCmd", payload: cmd });
  };

  const handleSelected = (device: string) => {
    dispatch({ type: "setSelected", payload: device });
  };

  const handleDelete = () => {
    onDeleteRequest(state.newCmd);
  };

  const handleSave = () => {
    onSaveRequest(state.newCmd);
  };

  const handleExecute = async () => {
    await ADBShell.kill(pid.current);
    dispatch({ type: "setExecuting", payload: true });
    pid.current = await ADBShell.execute(
      state.selected,
      state.newCmd,
      (data) => {
        dispatch({ type: "setAdbOutput", payload: data });
      },
      (data) => {
        dispatch({ type: "setAdbOutput", payload: data });
      },
      () => {
        dispatch({ type: "setExecuting", payload: false });
      },
    );
  };

  const fetchDevices = async () => {
    const devices = await ADBShell.devices();
    dispatch({
      type: "setDevices",
      payload: devices,
    });
  };

  useEffect(() => {
    return () => {
      ADBShell.kill(pid.current);
    };
  }, [cmd]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    oldCmd: cmd ?? {
      title: "",
      description: "",
      command: "",
      keywords: "",
    },
    newCmd: cmd ?? {
      title: "",
      description: "",
      command: "",
      keywords: "",
    },
    changed: false,
    devices: [],
    selected: "",
    output: "",
    executing: false,
  });

  if (!cmd) {
    return <></>;
  }
  return (
    <Modal
      isOpen={true}
      onClose={onCloseRequest}
      size="sm"
      isDismissable
      className="bg-color-background"
    >
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
            <DeviceList devices={state.devices} onSelected={handleSelected} />
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
              isLoading={state.executing}
              radius="full"
              className="bg-transparent hover:shadow-inner"
              onClick={handleExecute}
            >
              <Image src="execute.svg" className="p-2" />
            </Button>
            <ConsoleArea text={state.output} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCmdDialog;

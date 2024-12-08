import {
  FormEvent,
  useEffect,
  useReducer,
} from "react";
import DeviceList from "./device-list";
import ConsoleArea from "./ConsoleArea";
import CmdModel from "@/database/Database";
import ADBShell from "@/shell/ADBShell";
import { CmdForm } from "@/components/cmd-form";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

type State = {
  oldCmd: CmdModel;
  newCmd: CmdModel;
  changed: boolean;
  devices: string[];
  selected: string;
};

type Action = {
  type: "setNewCmd" | "setDevices" | "setSelected";
  payload: CmdModel | boolean | string[] | string;
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
      const newCmd = action.payload as CmdModel;
      return {
        ...state,
        newCmd,
        changed: !deepEqual(state.oldCmd, newCmd),
      };
    }
    case "setDevices": {
      const devices = action.payload as string[];
      let selected = state.selected;
      if (selected === "" && devices.length > 0) {
        selected = devices[0];
      }
      return {
        ...state,
        devices: action.payload as string[],
        selected,
      };
    }
    case "setSelected": {
      return {
        ...state,
        selected: action.payload as string,
      };
    }
  }
}

function EditCmdDialog({
  open,
  output,
  cmd,
  onCloseRequest,
  onSaveRequest,
  onDeleteRequest,
  onExecuteRequest,
}: {
  open: boolean;
  output: string;
  cmd: CmdModel;
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

  const handleChanged = (cmd: CmdModel) => {
    dispatch({ type: "setNewCmd", payload: cmd });
  };

  const handleSelected = (device: string) => {
    dispatch({ type: "setSelected", payload: device });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (e.nativeEvent.submitter.id === "delete") {
    //   onDeleteRequest(cmd);
    // } else if (e.nativeEvent.submitter.id === "save") {
    //   const newCmd = {
    //     ...cmd,
    //     ...cmdState,
    //   };
    //   onSaveRequest(newCmd);
    // }
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

  const handleExecute = () => {
    onExecuteRequest(state.selected, state.newCmd);
  };

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
              <button
                id="save"
                type="submit"
                className="button-save-change"
                disabled={!state.changed}
              >
                ✓
              </button>
            )}

            <button type="submit" id="delete" className="button-save-change">
              ✗
            </button>

            <button
              type="button"
              className="cmd-row-submit"
              onClick={handleExecute}
            >
              ▶
            </button>
            <ConsoleArea text={output} />
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditCmdDialog;

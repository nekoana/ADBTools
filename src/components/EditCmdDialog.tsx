import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./EditCmdDialog.css";
import DeviceList from "./device-list";
import ConsoleArea from "./ConsoleArea";
import { MdDialog } from "@/wrapper/labs/dialog";
import CmdModel from "@/database/Database";
import ADBShell from "@/shell/ADBShell";

type State = {
  changed: boolean;
  devices: string[];
  selected: string;
};

type Action = {
  type: string;
  payload: any;
};

function reducer(state: State, action: Action) {}

function EditCmdDialog({
  open,
  output,
  cmd,
  onClose,
  onSaveRequest,
  onDeleteRequest,
  onExecuteRequest,
}: {
  open: boolean;
  output: string;
  cmd: CmdModel;
  onClose: () => void;
  onSaveRequest: (newModel: CmdModel) => void;
  onDeleteRequest: (cmd: CmdModel) => void;
  onExecuteRequest: (device: string, cmd: CmdModel) => void;
}) {
  const [changed, setChanged] = useState(false);
  const [devices, setDevices] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [cmdState, setCmdState] = useState(cmd);

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices]);

  useEffect(() => {
    const titleChanged = cmdState.title !== cmd.title;
    const descriptionChanged = cmdState.description !== cmd.description;
    const commandChanged = cmdState.command !== cmd.command;
    const keywordsChanged = cmdState.keywords !== cmd.keywords;

    setChanged(
      titleChanged || descriptionChanged || commandChanged || keywordsChanged,
    );
  }, [cmd, cmdState]);

  const handleCmdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCmdState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
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

    setDevices(devices);
  };

  useEffect(() => {
    fetchDevices();
  }, [cmd]);

  const handleExecute = () => {
    const newCmdModel = {
      ...cmd,
      ...cmdState,
    };
    onExecuteRequest(selectedDevice, newCmdModel);
  };

  return (
    <MdDialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="cmd-form">
        <div className="cmd-row">
          <p className="cmd-tips">Title:</p>
          <input
            type="text"
            id="title"
            className="cmd-input"
            value={cmdState.title}
            onChange={handleCmdChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Description:</p>
          <input
            id="description"
            className="cmd-input"
            value={cmdState.description}
            onChange={handleCmdChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Command:</p>
          <input
            id="command"
            className="cmd-input"
            value={cmdState.command}
            onChange={handleCmdChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Keywords:</p>
          <input
            type="text"
            id="keywords"
            className="cmd-input"
            value={cmdState.keywords}
            onChange={handleCmdChange}
          />
        </div>
        <div className="cmd-row">
          <button
            id="save"
            type="submit"
            className="button-save-change"
            disabled={!changed}
          >
            ✓
          </button>

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

          {devices.length > 0 && (
            <DeviceList
              devices={devices}
              selectedDevice={selectedDevice}
              onDeviceSelect={handleDeviceSelect}
            />
          )}
        </div>
      </form>
      <ConsoleArea text={output} />
    </MdDialog>
  );
}

export default EditCmdDialog;

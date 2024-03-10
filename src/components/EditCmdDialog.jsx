import { useEffect, useRef } from "react";
import { useState } from "react";
import ModalDialog from "./ModalDialog";
import "./EditCmdDialog.css";
import DeviceList from "./DeviceList";
import { adbShell } from "../shell/ADBShell";
import ConsoleArea from "./ConsoleArea";

function EditCmdDialog({
  open,
  output,
  cmdModel,
  onSaveRequest,
  onDeleteRequest,
  onCloseRequest,
  onExecuteRequest,
}) {
  if (!cmdModel) {
    return null;
  }

  const [changed, setChanged] = useState(false);

  const [devices, setDevices] = useState([]);

  const [selectedDevice, setSelectedDevice] = useState("");

  const [cmdState, setCmdState] = useState({
    title: cmdModel.title,
    description: cmdModel.description,
    command: cmdModel.command,
    keywords: cmdModel.keywords,
  });

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices]);

  useEffect(() => {
    const titleChanged = cmdState.title !== cmdModel.title;
    const descriptionChanged = cmdState.description !== cmdModel.description;
    const commandChanged = cmdState.command !== cmdModel.command;
    const keywordsChanged = cmdState.keywords !== cmdModel.keywords;

    setChanged(
      titleChanged || descriptionChanged || commandChanged || keywordsChanged
    );
  }, [cmdModel, cmdState]);

  const handleCmdChange = (e) => {
    const { id, value } = e.target;

    setCmdState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDeviceSelect = (device) => {
    setSelectedDevice(device);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.id === "delete") {
      onDeleteRequest(cmdModel);
    } else if (e.nativeEvent.submitter.id === "save") {
      const newCmdModel = cmdModel.update(
        cmdState.title,
        cmdState.description,
        cmdState.command,
        cmdState.keywords
      );
      onSaveRequest(newCmdModel);
    }
  };

  const fetchDevices = async () => {
    const devices = await adbShell.devices();

    setDevices(devices);
  };

  useEffect(() => {
    fetchDevices();
  }, [cmdModel]);

  const handleExecute = () => {
     const newCmdModel = cmdModel.update(
       cmdState.title,
       cmdState.description,
       cmdState.command,
       cmdState.keywords
     );
    onExecuteRequest(selectedDevice, newCmdModel);
  };

  return (
    <ModalDialog open={open} onCloseRequest={onCloseRequest}>
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

          <DeviceList
            devices={devices}
            selectedDevice={selectedDevice}
            onDeviceSelect={handleDeviceSelect}
          />
        </div>
      </form>
      <ConsoleArea text={output} />
    </ModalDialog>
  );
}

export default EditCmdDialog;

import { useEffect, useRef } from "react";
import { useState } from "react";
import ModalDialog from "./ModalDialog";
import "./EditCmdDialog.css";
import DeviceList from "./DeviceList";
import { adbShell } from "../shell/ADBShell";

function EditCmdDialog({
  open,
  cmdModel,
  onSaveRequest,
  onDeleteRequest,
  onCloseRequest,
}) {
  if (!cmdModel) {
    return null;
  }

  const [state, setState] = useState({
    title: cmdModel.title,
    description: cmdModel.description,
    command: cmdModel.command,
    keywords: cmdModel.keywords,
    changed: false,
  });

  const [devices, setDevices] = useState([]);

  const [selectedDevice, setSelectedDevice] = useState("");

  useEffect(() => {
    if (devices.length > 0) {
      setSelectedDevice(devices[0]);
    }
  }, [devices]);

  const { title, description, command, keywords, changed } = state;

  useEffect(() => {
    const titleChanged = title !== cmdModel.title;
    const descriptionChanged = description !== cmdModel.description;
    const commandChanged = command !== cmdModel.command;
    const keywordsChanged = keywords !== cmdModel.keywords;

    setState((prevState) => ({
      ...prevState,
      changed:
        titleChanged || descriptionChanged || commandChanged || keywordsChanged,
    }));
  }, [cmdModel, title, description, command, keywords]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setState((prevState) => ({
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
        title,
        description,
        command,
        keywords
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

  const pid = useRef(null);

  const handleError = (data) => {
    console.error(data);
  };

  const handleData = (data) => {
    console.log(data);
  };

  const handleClose = () => {
    console.log("Command closed");

    pid.current = null;
  };

  const handleExecute = () => {
    const pid = adbShell.execute(
      selectedDevice,
      cmdModel,
      handleData,
      handleError,
      handleClose
    );

    pid.current = pid;
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
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Description:</p>
          <input
            id="description"
            className="cmd-input"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Command:</p>
          <input
            id="command"
            className="cmd-input"
            value={command}
            onChange={handleChange}
          />
        </div>
        <div className="cmd-row">
          <p className="cmd-tips">Keywords:</p>
          <input
            type="text"
            id="keywords"
            className="cmd-input"
            value={keywords}
            onChange={handleChange}
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
    </ModalDialog>
  );
}

export default EditCmdDialog;

import { useEffect } from "react";
import { useState } from "react";
import ModalDialog from "./ModalDialog";
import "./EditCmdDialog.css";
import DeviceList from "./DeviceList";

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

  const [title, setTitle] = useState(cmdModel.title);
  const [description, setDescription] = useState(cmdModel.description);
  const [command, setCommand] = useState(cmdModel.command);
  const [keywords, setKeywords] = useState(cmdModel.keywords);

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const titleChanged = title !== cmdModel.title;
    const descriptionChanged = description !== cmdModel.description;
    const commandChanged = command !== cmdModel.command;
    const keywordsChanged = keywords !== cmdModel.keywords;

    setChanged(
      titleChanged || descriptionChanged || commandChanged || keywordsChanged
    );
  }, [cmdModel, title, description, command, keywords]);

  const changeMap = {
    title: setTitle,
    description: setDescription,
    command: setCommand,
    keywords: setKeywords,
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    changeMap[id](value);
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

  const [testDevice, setTestDevice] = useState(["Device 1", "Device 2"]);

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

          <button type="button" className="cmd-row-submit">
            ▶
          </button>

          <DeviceList
            devices={testDevice}
            onDeviceSelect={(e) => console.log(e)}
          />
        </div>
      </form>
    </ModalDialog>
  );
}

export default EditCmdDialog;

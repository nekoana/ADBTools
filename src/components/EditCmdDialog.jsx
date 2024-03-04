import { useEffect } from "react";
import { useState } from "react";
import ModalDialog from "./ModalDialog";
import "./EditCmdDialog.css";
import CmdModel from "../model/CmdModel";

function EditCmdDialog({ open, onSaveRequest, onCloseRequest, cmdModel }) {
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
    const newCmdModel = cmdModel.update(
      title,
      description,
      command,
      keywords,
    );

    console.log("newCmdModel", newCmdModel);

    onSaveRequest(newCmdModel);
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
            type="submit"
            className="button-save-change"
            disabled={!changed}
          >
            ✓
          </button>

          <button type="button" className="cmd-row-submit">
            ▶
          </button>
        </div>
      </form>
    </ModalDialog>
  );
}

export default EditCmdDialog;

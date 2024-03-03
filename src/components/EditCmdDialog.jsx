import { useEffect } from "react";
import { useState } from "react";
import ModalDialog from "./ModalDialog";

function EditCmdDialog({ open, onCloseRequest, cmdModel }) {
  if (!cmdModel) {
    return null;
  }

  const [title, setTitle] = useState(cmdModel.title);
  const [description, setDescription] = useState(cmdModel.description);
  const [command, setCommand] = useState(cmdModel.command);
  const [keywords, setKeywords] = useState(cmdModel.keywords);

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
    const cmd = {
      id: cmdModel.id,
      title,
      description,
      command,
      keywords,
    };
    onSubmit(cmd);
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
      </form>
    </ModalDialog>
  );
}

export default EditCmdDialog;

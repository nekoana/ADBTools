import { useState } from "react";
import "./App.css";
import FloatButton from "./components/FloatButton";
import NewCmdDialog from "./components/NewCmdDialog";
import CmdCard from "./components/CmdCard";
import { insert, selectAll } from "./database/Database";

function App() {
  const [open, setOpen] = useState(false);

  const [cmdModel, setCmdModel] = useState(Array());

  const loadCmdModel = async () => {
    const result = await selectAll();
    setCmdModel(result);
  };

  useState(() => {
    loadCmdModel();
  });

  const handleEditClick = (item) => {
    console.log("Edit", item);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleCloseRequest = () => {
    setOpen(false);
  };

  const handleSubmit = async (cmd) => {
    const result = await insert(cmd);
    console.log(result);
    setOpen(false);

    loadCmdModel();
  };

  return (
    <div className="container">
      {cmdModel.map((item) => {
        return (
          <div key={item.id}>
            <CmdCard
              cmdModel={item}
              onClick={handleEditClick}
            />
          </div>
        );
      })}

      <FloatButton onClick={handleAddClick}>+</FloatButton>

      <NewCmdDialog
        open={open}
        onCloseRequest={handleCloseRequest}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;

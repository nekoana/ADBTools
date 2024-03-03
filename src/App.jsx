import { useDeferredValue, useEffect, useState } from "react";
import "./App.css";
import FloatButton from "./components/FloatButton";
import NewCmdDialog from "./components/NewCmdDialog";
import EditCmdDialog from "./components/EditCmdDialog";
import CmdCard from "./components/CmdCard";
import { db } from "./database/Database";

function App() {
  const [open, setOpen] = useState(false);

  const [cmdModel, setCmdModel] = useState(Array());

  const [editCmdModel, setEditCmdModel] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setEditOpen(editCmdModel !== null);
  }, [editCmdModel]);

  const loadCmdModel = async () => {
    const result = await db.selectAll();
    setCmdModel(result);
  };

  useState(() => {
    loadCmdModel();
  });

  const handleEditClick = (item) => {
    setEditCmdModel(item);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleCloseRequest = () => {
    setOpen(false);
  };

  const handleEditCloseRequest = (cmd) => {
    setEditCmdModel(null);
  };

  const handleSubmit = async (cmd) => {
    const result = await db.insert(cmd);
    console.log(result);
    setOpen(false);

    loadCmdModel();
  };

  return (
    <div className="container">
      {cmdModel.map((item) => {
        return (
          <div key={item.id}>
            <CmdCard cmdModel={item} onClick={handleEditClick} />
          </div>
        );
      })}

      <NewCmdDialog
        open={open}
        onCloseRequest={handleCloseRequest}
        onSubmit={handleSubmit}
      />

      <EditCmdDialog
        open={editOpen}
        cmdModel={editCmdModel}
        onCloseRequest={handleEditCloseRequest}
      />

      <FloatButton onClick={handleAddClick}>+</FloatButton>
    </div>
  );
}

export default App;

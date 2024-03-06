import { useDeferredValue, useEffect, useState } from "react";
import "./App.css";
import FloatButton from "./components/FloatButton";
import NewCmdDialog from "./components/NewCmdDialog";
import EditCmdDialog from "./components/EditCmdDialog";
import CmdCard from "./components/CmdCard";
import { db } from "./database/Database";

function App() {
  const [newOpen, setNewOpen] = useState(false);

  const [cmdModels, setCmdModels] = useState(Array());

  const [editCmdModel, setEditCmdModel] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setEditOpen(editCmdModel !== null);
  }, [editCmdModel]);

  const loadCmdModel = async () => {
    const result = await db.selectAll();
    setCmdModels(result);
  };

  useState(() => {
    loadCmdModel();
  });

  const handleEditClick = (item) => {
    setEditCmdModel(item);
  };

  const handleAddClick = () => {
    setNewOpen(true);
  };

  const handleCloseRequest = () => {
    setNewOpen(false);
  };

  const handleEditCloseRequest = () => {
    setEditCmdModel(null);
  };

  const handleNewSubmit = async (cmd) => {
    const result = await db.insert(cmd);

    setNewOpen(false);

    loadCmdModel();
  };

  const handleSaveRequest = async (cmd) => {
    await db.update(cmd);

    setEditCmdModel(null);

    loadCmdModel();
  };

  const handleDeleteRequest = async (cmd) => {
    await db.delete(cmd);

    setEditCmdModel(null);

    loadCmdModel();
  };

  return (
    <div className="container">
      {cmdModels.map((item) => {
        return (
          <div key={item.id}>
            <CmdCard cmdModel={item} onClick={handleEditClick} />
          </div>
        );
      })}

      <NewCmdDialog
        open={newOpen}
        onCloseRequest={handleCloseRequest}
        onSubmit={handleNewSubmit}
      />

      <EditCmdDialog
        open={editOpen}
        cmdModel={editCmdModel}
        onSaveRequest={handleSaveRequest}
        onDeleteRequest={handleDeleteRequest}
        onCloseRequest={handleEditCloseRequest}
      />

      <FloatButton onClick={handleAddClick}>+</FloatButton>
    </div>
  );
}

export default App;

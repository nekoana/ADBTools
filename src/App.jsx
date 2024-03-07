import { useDeferredValue, useEffect, useRef, useState } from "react";
import "./App.css";
import FloatButton from "./components/FloatButton";
import NewCmdDialog from "./components/NewCmdDialog";
import EditCmdDialog from "./components/EditCmdDialog";
import CmdCard from "./components/CmdCard";
import { db } from "./database/Database";
import { adbShell } from "./shell/ADBShell";

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

  const pid = useRef(null);

  const handleExecuteRequest = async (device, cmdModel) => {
    await adbShell.kill(pid.current);

    pid.current = await adbShell.execute(
      device,
      cmdModel,
      (data) => {
        console.log(data);
      },
      (data) => {
        console.log(data);
      },
      () => {
        console.log("close");
      }
    );
  };

  const handleEditCloseRequest = async () => {
    setEditCmdModel(null);

    await adbShell.kill(pid.current);
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
        onExecuteRequest={handleExecuteRequest}
      />

      <FloatButton onClick={handleAddClick}>+</FloatButton>
    </div>
  );
}

export default App;

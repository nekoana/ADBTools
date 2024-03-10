import { useDeferredValue, useEffect, useRef, useState } from "react";
import "./App.css";
import FloatButton from "./components/FloatButton";
import NewCmdDialog from "./components/NewCmdDialog";
import EditCmdDialog from "./components/EditCmdDialog";
import CmdCard from "./components/CmdCard";
import { db } from "./database/Database";
import { adbShell } from "./shell/ADBShell";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import SearchFloatButton from "./components/SearchFloatButton";

function App() {
  const checkUpdate = async () => {
    const update = await check();
    if (update?.available) {
      await update.downloadAndInstall();
      await relaunch();
    }
  };

  useEffect(() => {
    checkUpdate();
  }, []);

  const [newOpen, setNewOpen] = useState(false);

  const [cmdModels, setCmdModels] = useState(Array());

  const [editCmdModel, setEditCmdModel] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [output, setOutput] = useState("");

  useEffect(() => {
    setEditOpen(editCmdModel !== null);
  }, [editCmdModel]);

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
        setOutput((prev) => prev + "\n" + data);
      },
      (data) => {
        setOutput((prev) => prev + "\n" + data);
      },
      () => {
        setOutput((prev) => prev + "\n" + "Process exited");
      }
    );
  };

  const handleEditCloseRequest = async () => {
    setEditCmdModel(null);

    setOutput("");

    await adbShell.kill(pid.current);
  };

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = async () => {
    const result = await db.selectAll(searchText);
    setCmdModels(result);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

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

      {editCmdModel && (
        <EditCmdDialog
          open={editOpen}
          output={output}
          cmdModel={editCmdModel}
          onSaveRequest={handleSaveRequest}
          onDeleteRequest={handleDeleteRequest}
          onCloseRequest={handleEditCloseRequest}
          onExecuteRequest={handleExecuteRequest}
        />
      )}

      <SearchFloatButton
        text={searchText}
        onSearchChange={handleSearchChange}
      />
      <FloatButton onClick={handleAddClick}>+</FloatButton>
    </div>
  );
}

export default App;

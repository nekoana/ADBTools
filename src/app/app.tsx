import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NewCmdDialog from "../components/new-cmd-dialog";
import EditCmdDialog from "../components/edit-cmd-dialog";
import CmdCard from "../components/cmd-card";
import CmdModel, { db } from "@/database/Database";
import ADBShell from "@/shell/ADBShell";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { Child } from "@tauri-apps/plugin-shell";
import { SearchContext } from "@/app/layout";

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

  const [editCmdModel, setEditCmdModel] = useState<CmdModel | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const [output, setOutput] = useState("");

  useEffect(() => {
    setEditOpen(editCmdModel !== null);
  }, [editCmdModel]);

  const handleEditClick = (item: CmdModel) => {
    setEditCmdModel(item);
  };

  const handleAddClick = () => {
    setNewOpen(true);
  };

  const handleCloseRequest = () => {
    setNewOpen(false);
  };

  const handleNewSubmit = async (cmd: CmdModel) => {
    const result = await db.insert(cmd);

    setNewOpen(false);

    await handleSearch();
  };

  const handleSaveRequest = async (cmd: CmdModel) => {
    await db.update(cmd);

    setEditCmdModel(null);

    await handleSearch();
  };

  const handleDeleteRequest = async (cmd: CmdModel) => {
    await db.delete(cmd);

    setEditCmdModel(null);

    await handleSearch();
  };

  const pid = useRef<Child | null>(null);

  const handleExecuteRequest = async (device: string, cmd: CmdModel) => {
    await ADBShell.kill(pid.current);

    pid.current = await ADBShell.execute(
      device,
      cmd,
      (data) => {
        setOutput((prev) => prev + "\n" + data);
      },
      (data) => {
        setOutput((prev) => prev + "\n" + data);
      },
      () => {
        setOutput((prev) => prev + "\n" + "Process exited");
      },
    );
  };

  const handleEditCloseRequest = async () => {
    setEditCmdModel(null);

    setOutput("");

    await ADBShell.kill(pid.current);
  };

  const searchText = useContext(SearchContext);

  const handleSearch = async () => {
    const result = (await db.search(searchText)) ?? [];
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
    <>
      {cmdModels.map((item) => {
        return (
          <Fragment key={item.id}>
            <CmdCard cmdModel={item} onClick={handleEditClick} />
          </Fragment>
        );
      })}

      <NewCmdDialog
        open={newOpen}
        onClose={handleCloseRequest}
        onSubmit={handleNewSubmit}
      />

      {editCmdModel && (
        <EditCmdDialog
          open={editOpen}
          output={output}
          cmd={editCmdModel}
          onSaveRequest={handleSaveRequest}
          onDeleteRequest={handleDeleteRequest}
          onCloseRequest={handleEditCloseRequest}
          onExecuteRequest={handleExecuteRequest}
        />
      )}
    </>
  );
}

export default App;

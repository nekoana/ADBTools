import React, {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useRef,
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
import { Button, Image } from "@nextui-org/react";

type State = {
  isNewCmdOpen: boolean;
  isEditCmdOpen: boolean;
  isExecuting: boolean;
  cmdModels: CmdModel[];
  editCmdModel: CmdModel | null;
  adbOutput: string;
};

const InitialState: State = {
  isNewCmdOpen: false,
  isEditCmdOpen: false,
  isExecuting: false,
  cmdModels: [],
  editCmdModel: null,
  adbOutput: "",
};

type Action =
  | {
      type: "setNewCmdOpen";
      payload: boolean;
    }
  | {
      type: "setIsExecuting";
      payload: boolean;
    }
  | {
      type: "setCmdModels";
      payload: CmdModel[];
    }
  | {
      type: "setEditCmdModel";
      payload: CmdModel | null;
    }
  | {
      type: "setAdbOutput";
      payload: string;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setNewCmdOpen":
      return {
        ...state,
        isNewCmdOpen: action.payload,
      };
    case "setIsExecuting":
      return {
        ...state,
        isExecuting: action.payload,
      };
    case "setCmdModels":
      return {
        ...state,
        cmdModels: action.payload,
      };
    case "setEditCmdModel":
      return {
        ...state,
        adbOutput: "",
        editCmdModel: action.payload,
        isEditCmdOpen: !!action.payload,
      };
    case "setAdbOutput":
      return {
        ...state,
        adbOutput: action.payload,
      };
    default:
      return state;
  }
}

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

  const [state, dispatch] = useReducer(reducer, InitialState);

  useEffect(() => {
    handleSearch();
  }, [state.isNewCmdOpen, state.isEditCmdOpen]);

  const pid = useRef<Child | null>(null);

  const handleNewSubmit = async (cmd: CmdModel) => {
    await db.insert(cmd);
    dispatch({ type: "setNewCmdOpen", payload: false });
  };

  const handleSave = async (cmd: CmdModel) => {
    await db.update(cmd);
    dispatch({ type: "setEditCmdModel", payload: null });
  };

  const handleDelete = async (cmd: CmdModel) => {
    await db.delete(cmd);
    dispatch({ type: "setEditCmdModel", payload: null });
  };

  const handleExecute = async (device: string, cmd: CmdModel) => {
    await ADBShell.kill(pid.current);

    dispatch({ type: "setIsExecuting", payload: true });

    pid.current = await ADBShell.execute(
      device,
      cmd,
      (data) => {
        dispatch({ type: "setAdbOutput", payload: data });
      },
      (data) => {
        dispatch({ type: "setAdbOutput", payload: data });
      },
      () => {
        dispatch({ type: "setIsExecuting", payload: false });
      },
    );
  };

  const handleEditClose = async () => {
    dispatch({ type: "setEditCmdModel", payload: null });
    await ADBShell.kill(pid.current);
  };

  const searchText = useContext(SearchContext);

  const handleSearch = async () => {
    const result = (await db.search(searchText)) ?? [];
    dispatch({ type: "setCmdModels", payload: result });
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
      {state.cmdModels.map((item) => {
        return (
          <Fragment key={item.id}>
            <CmdCard
              cmdModel={item}
              onClick={(cmd) => {
                dispatch({ type: "setEditCmdModel", payload: cmd });
              }}
            />
          </Fragment>
        );
      })}

      <NewCmdDialog
        open={state.isNewCmdOpen}
        onClose={() => {
          dispatch({ type: "setNewCmdOpen", payload: false });
        }}
        onSubmit={handleNewSubmit}
      />

      {state.editCmdModel && (
        <EditCmdDialog
          open={state.isEditCmdOpen}
          output={state.adbOutput}
          cmd={state.editCmdModel}
          isExecuting={state.isExecuting}
          onClearRequest={() => {
            dispatch({ type: "setAdbOutput", payload: "" });
          }}
          onSaveRequest={handleSave}
          onDeleteRequest={handleDelete}
          onCloseRequest={handleEditClose}
          onExecuteRequest={handleExecute}
        />
      )}

      <Button
        radius="full"
        onClick={() => {
          dispatch({ type: "setNewCmdOpen", payload: true });
        }}
        variant="flat"
        isIconOnly
        className="bg-color-on-primary fixed right-2 bottom-2 w-14 h-14 p-4 shadow hover:shadow-inner"
      >
        <Image src="add.svg" />
      </Button>
    </>
  );
}

export default App;

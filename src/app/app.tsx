import React, { Fragment, useContext, useEffect, useReducer } from "react";
import NewCmdDialog from "../components/new-cmd-dialog";
import EditCmdDialog from "../components/edit-cmd-dialog";
import CmdCard from "../components/cmd-card";
import CmdModel, { db } from "@/database/Database";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { Button, Image } from "@nextui-org/react";
import { SearchContext } from "@/app/search";

type State = {
  isNewCmdOpen: boolean;
  cmdModels: CmdModel[];
  editCmdModel: CmdModel | null;
};

const InitialState: State = {
  isNewCmdOpen: false,
  cmdModels: [],
  editCmdModel: null,
};

type Action =
  | {
      type: "setNewCmdOpen";
      payload: boolean;
    }
  | {
      type: "setCmdModels";
      payload: CmdModel[];
    }
  | {
      type: "setEditCmdModel";
      payload: CmdModel | null;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setNewCmdOpen":
      return {
        ...state,
        isNewCmdOpen: action.payload,
      };
    case "setCmdModels":
      return {
        ...state,
        cmdModels: action.payload,
      };
    case "setEditCmdModel":
      return {
        ...state,
        editCmdModel: action.payload,
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
  }, [state.isNewCmdOpen, state.editCmdModel]);

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

  const handleEditClose = () => {
    dispatch({ type: "setEditCmdModel", payload: null });
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
          cmd={state.editCmdModel}
          onSaveRequest={handleSave}
          onDeleteRequest={handleDelete}
          onCloseRequest={handleEditClose}
        />
      )}

      <Button
        radius="full"
        onClick={(e) => {
          e.stopPropagation();
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

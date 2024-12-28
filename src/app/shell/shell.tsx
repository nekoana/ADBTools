"use client";

import React, { Fragment, useEffect } from "react";
import NewCmdDialog from "../../components/new-cmd-dialog";
import EditCmdDialog from "../../components/edit-cmd-dialog";
import CmdCard from "../../components/cmd-card";
import { Cmd } from "@/database/AdbDatabase";
import { Button, Image } from "@nextui-org/react";
import useCmds from "@/hooks/useCmds";
import useSearchText from "@/hooks/useSearchText";

function Shell() {
  const { cmds, search, update, insert, remove } = useCmds();

  const [editCmd, setEditCmd] = React.useState<Cmd | null>(null);
  const [isNewCmdOpen, setIsNewCmdOpen] = React.useState(false);
  const searchText = useSearchText();
  useEffect(() => {
    search(searchText);
  }, [searchText]);

  return (
    <>
      {cmds.map((item) => {
        return (
          <Fragment key={item.id}>
            <CmdCard
              cmdModel={item}
              onClick={(cmd) => {
                setEditCmd(cmd);
              }}
            />
          </Fragment>
        );
      })}

      <NewCmdDialog
        open={isNewCmdOpen}
        onClose={() => {
          setIsNewCmdOpen(false);
        }}
        onSubmit={(cmd) => {
          insert(cmd);
          setIsNewCmdOpen(false);
        }}
      />

      {editCmd && (
        <EditCmdDialog
          cmd={editCmd}
          onSaveRequest={(cmd) => {
            update(cmd);
            setEditCmd(null);
          }}
          onDeleteRequest={(cmd) => {
            remove(cmd);
          }}
          onCloseRequest={() => {
            setEditCmd(null);
          }}
        />
      )}

      <Button
        radius="full"
        onClick={(e) => {
          e.stopPropagation();
          setIsNewCmdOpen(true);
        }}
        variant="flat"
        isIconOnly
        className="bg-color-on-primary fixed right-2 bottom-2 w-14 h-14 p-4 shadow hover:shadow-inner z-50"
      >
        <Image src="add.svg" />
      </Button>
    </>
  );
}

export default Shell;

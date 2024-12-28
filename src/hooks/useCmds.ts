import { useEffect, useState, useCallback } from "react";
import { Cmd, DB } from "@/database/AdbDatabase";

function useCmds() {
  const [cmds, setCmds] = useState<Cmd[]>(new Array<Cmd>());

  const search = useCallback((keywords: string) => {
    DB.search(keywords).then((cmds) => setCmds(cmds));
  }, []);

  const update = useCallback(
    (cmd: Cmd) => {
      DB.update(cmd).then(() => search(""));
    },
    [search],
  );

  const insert = useCallback(
    (cmd: Cmd) => {
      DB.insert(cmd).then(() => search(""));
    },
    [search],
  );

  const remove = useCallback(
    (cmd: Cmd) => {
      DB.delete(cmd).then(() => search(""));
    },
    [search],
  );

  useEffect(() => {
    search("");
  }, [search]);

  return { cmds, search, update, insert, remove };
}

export default useCmds;

import { useEffect, useState, useCallback, useMemo } from "react";
import CmdRepository from "@/repository/CmdRepository";
import { Cmd } from "@/model/Cmd";

function useCmds() {
  const repository = useMemo(() => new CmdRepository(), []);

  const [cmds, setCmds] = useState<Cmd[]>(new Array<Cmd>());

  const search = useCallback((keywords: string) => {
    repository.search(keywords).then((cmds) => setCmds(cmds));
  }, []);

  const update = useCallback(
    (cmd: Cmd) => {
      repository.update(cmd).then(() => search(""));
    },
    [search],
  );

  const insert = useCallback(
    (cmd: Cmd) => {
      repository.insert(cmd).then(() => search(""));
    },
    [search],
  );

  const remove = useCallback(
    (cmd: Cmd) => {
      repository.delete(cmd).then(() => search(""));
    },
    [search],
  );

  useEffect(() => {
    search("");
  }, [search]);

  return { cmds, search, update, insert, remove };
}

export default useCmds;

import { MdOutlinedTextField } from "@/wrapper/text-field";
import CmdModel from "@/database/Database";
import React, { ChangeEvent, forwardRef, useState } from "react";

export const CmdForm = forwardRef(function (
  {
    onSubmit,
    onChanged,
    defaultCmd,
  }: {
    onSubmit: (cmd: CmdModel) => void;
    onChanged?: (cmd: CmdModel) => void;
    defaultCmd?: CmdModel;
  },
  formRef: React.Ref<HTMLFormElement>,
) {
  const [cmd, setCmd] = useState<CmdModel>(
    defaultCmd ?? {
      title: "",
      description: "",
      command: "",
      keywords: "",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    form.reset();
    onSubmit(cmd);
  };

  const handleCmdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const newCmd = {
      ...cmd,
      [id]: value,
    };
    setCmd(newCmd);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Title:</p>
        <MdOutlinedTextField
          value={cmd.title}
          type="text"
          id="caption"
          className="flex-1"
          required={true}
        />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Description:</p>
        <MdOutlinedTextField id="description" value={cmd.description} />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Command:</p>
        <MdOutlinedTextField id="command" required={true} value={cmd.command} />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Keywords:</p>
        <MdOutlinedTextField
          type="text"
          id="keywords"
          required={true}
          value={cmd.keywords}
        />
      </div>
    </form>
  );
});

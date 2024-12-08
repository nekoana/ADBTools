import CmdModel from "@/database/Database";
import React, { ChangeEvent, useState } from "react";
import { Form, Input } from "@nextui-org/react";

export function CmdForm({
  onSubmit,
  onChanged,
  defaultCmd,
  children,
}: {
  onSubmit: (cmd: CmdModel) => void;
  onChanged?: (cmd: CmdModel) => void;
  defaultCmd?: CmdModel;
  children?: React.ReactNode;
}) {
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
    <Form onSubmit={handleSubmit} method="dialog">
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <p className="text-md w-24">Title:</p>
        <Input
          value={cmd.title}
          type="text"
          id="title"
          isRequired
          onChange={handleCmdChange}
        />
        <p className="text-md w-24">Description:</p>
        <Input
          id="description"
          value={cmd.description}
          onChange={handleCmdChange}
        />
        <p className="text-md w-24">Command:</p>
        <Input
          id="command"
          required={true}
          value={cmd.command}
          onChange={handleCmdChange}
        />
        <p className="text-md w-24">Keywords:</p>
        <Input
          type="text"
          id="keywords"
          isRequired
          value={cmd.keywords}
          onChange={handleCmdChange}
        />
      </div>
      {children}
    </Form>
  );
}

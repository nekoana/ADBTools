import { MdOutlinedTextField } from "@/wrapper/text-field";
import CmdModel from "@/database/Database";
import React, { forwardRef } from "react";

export const CmdForm = forwardRef(function (
  {
    onSubmit,
  }: {
    onSubmit: (cmd: CmdModel) => void;
  },
  formRef: React.Ref<HTMLFormElement>,
) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const title = form["caption"].value;
    const description = form["description"].value;
    const command = form["command"].value;
    const keywords = form["keywords"].value;

    form.reset();

    const cmd: CmdModel = { title, description, command, keywords };
    onSubmit(cmd);
  };

  return (
    <form className="w-full h-full" ref={formRef} onSubmit={handleSubmit}>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Title:</p>
        <MdOutlinedTextField
          type="text"
          id="caption"
          className="flex-1"
          required={true}
        />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Description:</p>
        <MdOutlinedTextField id="description" />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Command:</p>
        <MdOutlinedTextField id="command" required={true} />
      </div>
      <div className="flex flex-row items-center m-2">
        <p className="text-lg w-24">Keywords:</p>
        <MdOutlinedTextField type="text" id="keywords" required={true} />
      </div>
    </form>
  );
});

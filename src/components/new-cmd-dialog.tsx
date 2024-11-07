import { CmdForm } from "./cmd-form";
import { MdDialog } from "@/wrapper/labs/dialog";
import { MdTextButton } from "@/wrapper/button";
import CmdModel from "@/database/Database";
import { useRef } from "react";

function NewCmdDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (cmd: CmdModel) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <MdDialog open={open} onClose={onClose}>
      <div slot="headline">
        <h2>New Command</h2>
      </div>
      <div slot="content">
        <CmdForm onSubmit={onSubmit} ref={formRef} />
      </div>
      <div slot="actions">
        <MdTextButton onClick={handleSubmit}>Ok</MdTextButton>
      </div>
    </MdDialog>
  );
}

export default NewCmdDialog;

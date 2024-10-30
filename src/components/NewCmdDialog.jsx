import ModalDialog from "./ModalDialog";
import CmdForm from "./CmdForm";

function NewCmdDialog({ open, onCloseRequest, onSubmit }) {
  return (
    <ModalDialog open={open} onCloseRequest={onCloseRequest}>
      <CmdForm onSubmit={onSubmit} />
    </ModalDialog>
  );
}

export default NewCmdDialog;

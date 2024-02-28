import { useEffect } from "react";
import { useRef } from "react";
import "./ModalDialog.css";

function ModalDialog({ open, ...props }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return (
    <dialog ref={modalRef} className="modal-dialog">
      <div {...props} />
    </dialog>
  );
}


export default ModalDialog;
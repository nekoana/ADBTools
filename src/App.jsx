import { useState } from "react";
import "./App.css";
import CmdCard from "./components/CmdCard";
import FloatButton from "./components/FloatButton";
import ModalDialog from "./components/ModalDialog";
import CmdForm from "./components/CmdForm";

function App() {
  const [open, setOpen] = useState(false);

  const handleCmdClick = (e) => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log(data);
  };

  return (
    <div className="container">
      {Array(10)
        .fill()
        .map((_, i) => (
          <CmdCard onClick={handleCmdClick} />
        ))}

      <FloatButton onClick={handleCmdClick}>+</FloatButton>

      <ModalDialog open={open}>
        <CmdForm onSubmit={handleSubmit} />
      </ModalDialog>
    </div>
  );
}

export default App;

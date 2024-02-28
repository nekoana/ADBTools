import { useState } from "react";
import "./App.css";
import Cmd from "./components/Cmd";
import FloatButton from "./components/FloatButton";
import ModalDialog from "./components/ModalDialog";

function App() {
  const [open, setOpen] = useState(false);

  const handleCmdClick = (e) => {
    setOpen(true);
  };

  return (
    <div className="container">
      {Array(10)
        .fill()
        .map((_, i) => (
          <Cmd onClick={handleCmdClick} />
        ))}

      <FloatButton />

      <ModalDialog open={open}>
        <h1>Hello World</h1>
      </ModalDialog>
    </div>
  );
}

export default App;

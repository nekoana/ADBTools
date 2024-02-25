import "./App.css";
import Cmd from "./components/Cmd";
import FloatButton from "./components/FloatButton";

function App() {
  return (
    <div className="container">
      {Array(10)
        .fill()
        .map((_, i) => (
          <Cmd />
        ))}

        <FloatButton />
    </div>
  );
}

export default App;

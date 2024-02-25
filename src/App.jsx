import "./App.css";
import Cmd from "./components/Cmd";

function App() {
  return (
    <div className="container">
      {Array(10)
        .fill()
        .map((_, i) => (
          <Cmd />
        ))}
    </div>
  );
}

export default App;

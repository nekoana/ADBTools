import "./ConsoleArea.css";

function ConsoleArea({ text }) {
  return (
    <div className="console-area">
      <h6 className="console-title">Console</h6>
      <div className="console-text">{text}</div>
    </div>
  );
}

export default ConsoleArea;

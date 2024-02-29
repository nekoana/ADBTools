import "./CmdForm.css";

function CmdForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="cmd-form">
      <div className="cmd-row">
        <p className="cmd-tips">Title:</p>
        <input type="text" id="title" className="cmd-input" />
      </div>
      <div className="cmd-row">
        <p className="cmd-tips">Description:</p>
        <input id="description" className="cmd-input" />
      </div>
      <div className="cmd-row">
        <p className="cmd-tips">Keywords:</p>
        <input type="text" id="keywords" className="cmd-input" />
      </div>
      <input type="submit" value="Submit" className="cmd-row-submit" />
    </form>
  );
}

export default CmdForm;

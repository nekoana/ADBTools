import "./CmdForm.css";

function CmdForm({ onSubmit }) {
  const ids = ["title", "description", "command", "keywords"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = ids.map((id) => {
      return document.getElementById(id).value;
    }).reduce((acc, value, index) => {
      acc[ids[index]] = value;
      return acc;
    }, {});

    //清除输入框
    ids.forEach((id) => {
      document.getElementById(id).value = "";
    });

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="cmd-form">
      <div className="cmd-row">
        <p className="cmd-tips">Title:</p>
        <input type="text" id="title" className="cmd-input" />
      </div>
      <div className="cmd-row">
        <p className="cmd-tips">Description:</p>
        <input id="description" className="cmd-input" />
      </div>
      <div className="cmd-row">
        <p className="cmd-tips">Command:</p>
        <input id="command" className="cmd-input" />
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

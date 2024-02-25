import "../neumorphism.css";
import "./Cmd.css";

function Title({ title }) {
  return <p className="title">{title}</p>;
}

function Description({ description }) {
  return (
    <p className="description" title={description}>
      {description}
    </p>
  );
}

function Cmd() {
  return (
    <div className="neumorphism cmd">
      <Title title="Title" />
      <Description description="Description Description Description Description Description Description" />
    </div>
  );
}

export default Cmd;

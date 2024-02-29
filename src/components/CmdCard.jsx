import "../neumorphism.css";
import "./CmdCard.css";

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

function CmdCard({ onClick }) {
  return (
    <div className="neumorphism cmd" onClick={onClick}>
      <Title title="Title" />
      <Description description="Description Description Description Description Description Description" />
    </div>
  );
}

export default CmdCard;

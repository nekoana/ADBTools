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

function CmdCard({ onClick, cmdModel }) {
  return (
    <div className="neumorphism cmd" onClick={() => onClick(cmdModel)}>
      <Title title={cmdModel.title} />
      <Description description={cmdModel.description} />
    </div>
  );
}

export default CmdCard;

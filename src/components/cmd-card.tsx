import "../app/neumorphism.css";
import { MdFilledCard } from "@/wrapper/labs/card";
import CmdModel from "@/database/Database";

function Title({ title }: { title: string }) {
  return <p className="text-xl  truncate w-full text-center">{title}</p>;
}

function Description({ description }: { description: string }) {
  return (
    <p className="text-sm truncate w-full text-center" title={description}>
      {description}
    </p>
  );
}

function CmdCard({
  onClick,
  cmdModel,
}: {
  onClick: (cmdModel: CmdModel) => void;
  cmdModel: CmdModel;
}) {
  return (
    <MdFilledCard
      className="w-36 h-24 p-2 truncate items-center justify-center hover:scale-95 transition-all flex flex-col cursor-pointer"
      onClick={() => onClick(cmdModel)}
    >
      <Title title={cmdModel.title} />
      <Description description={cmdModel.description} />
    </MdFilledCard>
  );
}

export default CmdCard;

import "../app/neumorphism.css";
import CmdModel from "@/database/Database";
import {
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
function CmdCard({
  onClick,
  cmdModel,
}: {
  onClick: (cmdModel: CmdModel) => void;
  cmdModel: CmdModel;
}) {
  return (
    <Card className="py-4" isPressable={true} onClick={() => onClick(cmdModel)}>
      <CardHeader className="pb-0 flex-col items-center">
        <p className="text-tiny truncate uppercase font-bold w-full text-center">
          {cmdModel.title}
        </p>
      </CardHeader>
      <CardBody className="py-0 text-small text-default-400 items-center">
        <p className="w-full text-center">{cmdModel.description}</p>
      </CardBody>
    </Card>
  );
}

export default CmdCard;

import { Card, CardHeader, CardBody } from "@nextui-org/react";

import { Cmd } from "@/model/Cmd";
function CmdCard({
  onClick,
  cmdModel,
}: {
  onClick: (cmdModel: Cmd) => void;
  cmdModel: Cmd;
}) {
  return (
    <Card
      className="py-4 shadow"
      isPressable={true}
      isHoverable={true}
      onPress={() => onClick(cmdModel)}
    >
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

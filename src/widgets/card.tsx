import { Cmd } from "@/model/Cmd";
import { Card as NextCard, CardBody, CardHeader } from "@nextui-org/react";

function Card({
  title,
  body,
  onClick,
  cmdModel,
}: {
  title: string;
  body: string;
  onClick: (cmdModel: Cmd) => void;
  cmdModel: Cmd;
}) {
  return (
    <NextCard
      className="py-4 shadow"
      isPressable={true}
      isHoverable={true}
      onPress={() => onClick(cmdModel)}
    >
      <CardHeader className="pb-0 flex-col items-center">
        <p className="text-tiny truncate uppercase font-bold w-full text-center">
          {title}
        </p>
      </CardHeader>
      <CardBody className="py-0 text-small text-default-400 items-center">
        <p className="w-full text-center">{body}</p>
      </CardBody>
    </NextCard>
  );
}

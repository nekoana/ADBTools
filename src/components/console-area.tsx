import { Textarea } from "@nextui-org/react";

function ConsoleArea({ text }: { text: string }) {
  return (
    <div className="fixed bottom-0 right-0 left-0 mx-auto z-50 w-10/12 h-12 p-4  hover:h-96 text-center bg-color-background shadow rounded-xl transition-all overflow-y-scroll">
      <Textarea
        classNames={{
          inputWrapper: "resize-y min-h-80",
          input: "resize-y min-h-80",
        }}
        label="Console"
        labelPlacement="outside"
        maxRows={1000}
        disableAutosize
        variant="flat"
        isReadOnly
        value={text}
      />
    </div>
  );
}

export default ConsoleArea;

import { Image, Input } from "@nextui-org/react";
import React from "react";

function SearchInput({
  setSearchText,
  className,
}: {
  setSearchText: (text: string) => void;
  className?: string;
}) {
  return (
    <Input
      variant="underlined"
      isClearable
      placeholder="Search"
      classNames={{
        innerWrapper: "pb-0",
        inputWrapper:
          "border-b-outline hover:border-b-primary focus:border-b-primary",
      }}
      className={className}
      onValueChange={setSearchText}
      onClear={() => setSearchText("")}
      startContent={
        <Image src="search.svg" width={20} height={20} alt="search" />
      }
    />
  );
}

export default SearchInput;

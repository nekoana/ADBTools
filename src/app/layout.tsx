"use strict";
"use client";

import { Inter } from "next/font/google";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Button, Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { SearchContext } from "./search";
import { getVersion } from "@tauri-apps/api/app";
import { Chip } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchText, setSearchText] = React.useState("");

  const handleClose = async () => {
    const window = getCurrentWindow();
    await window.close();
  };

  const handleMinimize = async () => {
    const window = getCurrentWindow();
    await window.minimize();
  };

  const [version, setVersion] = React.useState<string | null>(null);

  React.useEffect(() => {
    getVersion().then((v) => {
      setVersion(v);
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          data-tauri-drag-region
          className="fixed titlebar flex flex-row max-w-full place-items-center top-0 left-0 right-0"
        >
          <Chip
            className="m-2 absolute bg-color-background shadow cursor-default"
            radius="full"
          >
            <span className="text-sm">Version: {version}</span>
          </Chip>

          <Input
            variant="underlined"
            isClearable
            placeholder="Search"
            classNames={{
              innerWrapper: "pb-0",
              inputWrapper:
                "border-b-outline hover:border-b-primary focus:border-b-primary",
            }}
            className="relative w-auto h-full mx-auto transition-all mb-0"
            onValueChange={setSearchText}
            onClear={() => setSearchText("")}
            startContent={
              <Image src="search.svg" width={20} height={20} alt="search" />
            }
          />

          <div
            className="ml-auto absolute right-0 flex flex-row"
            id="control-area"
          >
            <Button
              radius="full"
              isIconOnly
              className="bg-transparent hover:shadow-inner"
              onClick={handleMinimize}
            >
              <Image width={20} height={20} src="mini.svg" alt="minimize" />
            </Button>
            <Button
              radius="full"
              className="bg-transparent hover:shadow-inner"
              isIconOnly
              onClick={handleClose}
            >
              <Image width={20} height={20} src="close.svg" alt="close" />
            </Button>
          </div>
        </div>
        <SearchContext.Provider value={searchText}>
          <div className="contentbody">{children}</div>
        </SearchContext.Provider>
      </body>
    </html>
  );
}

export default RootLayout;

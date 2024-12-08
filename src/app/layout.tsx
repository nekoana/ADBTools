"use strict";
"use client";

import { Inter } from "next/font/google";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

const SearchContext = React.createContext("");

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          data-tauri-drag-region
          className="fixed titlebar flex flex-row max-w-full  top-0 left-0 right-0"
        >
          <Input
            variant="underlined"
            isClearable
            placeholder="Search"
            classNames = {{
                "innerWrapper":"pb-0",
                "inputWrapper":"border-b-outline hover:border-b-primary focus:border-b-primary",
            }}
            className="relative w-auto h-full mx-auto transition-all mb-0"
            onValueChange={setSearchText}
            onClear={() => setSearchText("")}
            startContent={
              <Image
                src="https://api.iconify.design/mdi:search.svg"
                alt="search"
              />
            }
          />

          <div
            className="ml-auto absolute right-0 flex flex-row"
            id="control-area"
          >
            <div
              className="titlebar-button"
              id="titlebar-minimize"
              onClick={handleMinimize}
            >
              <img
                src="https://api.iconify.design/mdi:window-minimize.svg"
                alt="minimize"
              />
            </div>
            <div
              className="titlebar-button"
              id="titlebar-close"
              onClick={handleClose}
            >
              <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
            </div>
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
export { SearchContext };

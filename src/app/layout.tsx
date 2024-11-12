"use strict";
"use client";

import { Inter } from "next/font/google";
import React from "react";
import { MdIconButton } from "@/wrapper/icon-button";
import { MdIcon } from "@/wrapper/icon";

const inter = Inter({ subsets: ["latin"] });

const SearchContext = React.createContext("");

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchText, setSearchText] = React.useState("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div data-tauri-drag-region className="titlebar">
          <div className="relative flex items-center w-auto h-full">
            <img
              src="https://api.iconify.design/mdi:search.svg"
              alt="search"
              className="absolute left-2 w-5 h-5"
            />
            <input
              className="appearance-none w-36 h-full border-0 border-b-2 rounded-b hover:w-48 focus:w-48 outline-none focus-border-b-primary px-8 bg-color-background transition-all"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
          <div className="titlebar-button" id="titlebar-minimize">
            <img
              src="https://api.iconify.design/mdi:window-minimize.svg"
              alt="minimize"
            />
          </div>
          <div className="titlebar-button" id="titlebar-close">
            <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
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

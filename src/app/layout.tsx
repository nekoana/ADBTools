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
      <div data-tauri-drag-region className="fixed titlebar flex flex-row max-w-full  top-0 left-0 right-0">
        <div className="relative flex items-center justify-center w-auto h-full mx-auto" id="search-area">
          <img
              src="https://api.iconify.design/mdi:search.svg"
              alt="search"
              className="absolute left-2 w-5 h-5"
          />
          <input
              className="appearance-none w-48 h-full border-0 border-b-2 rounded-b hover:w-64 focus:w-64 outline-none focus-border-b-primary px-8 bg-color-background transition-all"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
          />
        </div>

        <div className="ml-auto absolute right-0" id="control-area">
          <div className="titlebar-button" id="titlebar-minimize">
            <img
                src="https://api.iconify.design/mdi:window-minimize.svg"
                alt="minimize"
            />
          </div>
          <div className="titlebar-button" id="titlebar-close">
            <img src="https://api.iconify.design/mdi:close.svg" alt="close"/>
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
export {SearchContext};

"use strict";
"use client";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Button, Chip, Image, Input } from "@nextui-org/react";
import { SearchContext } from "@/context/SearchContext";
import { getVersion } from "@tauri-apps/api/app";
import WindowControl from "@/components/window-control";
import SearchInput from "@/components/search-input";
import VersionChip from "@/components/version-chip";

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          data-tauri-drag-region
          className="fixed titlebar flex flex-row max-w-full place-items-center top-0 left-0 right-0 z-50"
        >
          <div className="m-1 absolute">
            <VersionChip />
          </div>

          <div className="relative w-auto  mx-auto">
            <SearchInput setSearchText={setSearchText} />
          </div>

          <div className="ml-auto absolute right-0">
            <WindowControl onClose={handleClose} onMinimize={handleMinimize} />
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

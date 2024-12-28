"use strict";
"use client";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import WindowControl from "@/components/window-control";
import NavigationBar from "@/components/navigation-bar";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          className="titlebar flex flex-row max-w-full place-items-center top-0 left-0 right-0"
        >
          <div className="m-1 z-50">
            <NavigationBar />
          </div>
          <div className="ml-auto right-0 z-50">
            <WindowControl onClose={handleClose} onMinimize={handleMinimize} />
          </div>
        </div>
        <div className="contentbody">{children}</div>
      </body>
    </html>
  );
}

export default RootLayout;

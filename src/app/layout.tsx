"use strict";
"use client";

import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <input className="appearance-none w-48 h-full border-0 rounded-b border-b-2 focus:outline-none focus-border-b-primary px-8 bg-color-background" />
          </div>

          <div className="titlebar-button" id="titlebar-minimize">
            <img
              src="https://api.iconify.design/mdi:window-minimize.svg"
              alt="minimize"
            />
          </div>

          <div className="titlebar-button" id="titlebar-maximize">
            <img
              src="https://api.iconify.design/mdi:window-maximize.svg"
              alt="maximize"
            />
          </div>
          <div className="titlebar-button" id="titlebar-close">
            <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
          </div>
        </div>
        <div className="contentbody">{children}</div>
      </body>
    </html>
  );
}

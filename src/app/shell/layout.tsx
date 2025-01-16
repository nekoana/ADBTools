"use client";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto p-4 grid [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))] gap-4">
      {children}
    </div>
  );
}

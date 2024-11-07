"use client";

import App from "@/app/app";
import CmdCard from "@/components/cmd-card";
import "./page.css";

export default function Home() {
  return (
    <div className="mx-auto p-4 grid [grid-template-columns:repeat(auto-fill,minmax(9rem,1fr))] gap-4">
      <App />
    </div>
  );
}

"use client";

import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import Link from "next/link";
import React, { useEffect } from "react";
import Info from "@/app/info/info";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function Home() {
  useEffect(() => {
    check().then((update) => {
      if (update?.available) {
        update.downloadAndInstall().then(() => {
          relaunch().then(() => {
            console.log("Relaunched!");
          });
        });
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <Card className="shadow" isPressable={true} isHoverable={true}>
          <CardBody>
            <Link href="/shell">Shell</Link>
          </CardBody>
        </Card>
      </div>
      <Divider className="m-1" />
      <Info />
    </>
  );
}

"use client";

import useDevices from "@/hooks/useDevices";
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import ADBShell from "@/shell/ADBShell";

const cmd = {
  title: "brand",
  description: "设备品牌",
  command: "shell getprop | grep product",
  keywords: "",
};

const keys: Record<string, string> = {
  "ro.product.name": "name",
  "ro.product.brand": "brand",
  "ro.product.board": "board",
  "ro.product.device": "device",
  "ro.product.locale": "locale",
  "ro.product.build.version.sdk": "build.version.sdk",
  "ro.product.build.version.release": "build.version.release",
  "ro.product.build.type": "build.type",
  "ro.product.build.id": "build.id",
  "ro.product.build.date": "build.date",
  "ro.product.build.date.utc": "build.date.utc",
  "ro.product.cpu.abi": "cpu.abi",
  "ro.product.cpu.abilist": "cpu.abilist",
};

export default function Info() {
  const device = useDevices(5);

  const [infos, setInfos] = useState<{
    [key: string]: { key: string; value: string }[];
  }>({});

  const [isFetching, setIsFetching] = useState(false);

  const fetchInfos = async () => {
    setIsFetching(true);

    const rets = await ADBShell.executeAll(cmd, device);

    const infos: {
      [key: string]: { key: string; value: string }[];
    } = {};

    for (const [key, value] of Object.entries(rets)) {
      if (!value.data) continue;
      infos[key] = value.data
        .split("\n")
        .map((line) => line.match(/\[(.*?)\]: \[(.*?)\]/))
        .filter(
          (match): match is RegExpMatchArray =>
            match !== null && keys[match[1]] !== undefined,
        )
        .sort(
          (a, b) =>
            Object.keys(keys).indexOf(a[1]) - Object.keys(keys).indexOf(b[1]),
        )
        .map((match) => ({
          key: keys[match[1]],
          value: match[2],
        }));
    }

    console.log(infos);

    setIsFetching(false);

    setInfos(infos);
  };

  useEffect(() => {
    fetchInfos();
  }, [device]);

  if (!device || device.length === 0) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {Object.entries(infos).map(([key, value]) => {
          return (
            <Card key={key} className="w-fit p-2 shadow">
              <CardHeader>{key}</CardHeader>
              <CardBody>
                {value.map((item) => (
                  <div key={item.key}>
                    <span className="text-gray-500 select-auto">
                      {item.key}
                    </span>
                    <span className="text-gray-800 select-auto">: </span>
                    <span className="text-gray-800 select-auto">
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Button
        radius="full"
        onPress={() => {
          fetchInfos();
        }}
        isLoading={isFetching}
        variant="flat"
        isIconOnly
        className="bg-color-on-primary fixed right-2 bottom-2 w-14 h-14 p-4 shadow hover:shadow-inner z-50"
      >
        <Image src="refresh.svg" />
      </Button>
    </>
  );
}

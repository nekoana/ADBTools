"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import { BreadcrumbItem, Breadcrumbs, Chip } from "@nextui-org/react";

function NavigationBar() {
  const segment = useSelectedLayoutSegment();

  return (
    <Breadcrumbs
      classNames={{
        list: "shadow bg-color-background",
      }}
      underline="hover"
      variant="solid"
      radius="full"
    >
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      {segment &&
        segment.split("/").map((item, index) => (
          <BreadcrumbItem key={item}>
            <Link href={`/${item}`}>{item}</Link>
          </BreadcrumbItem>
        ))}
    </Breadcrumbs>
  );
}

export default NavigationBar;

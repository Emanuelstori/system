"use client";
import { Snippet } from "@nextui-org/react";
import CopyIcon from "./CopyIcon";
export default function Identificacao({ text }: { text: string }) {
  return (
    <Snippet
      hideSymbol
      variant="bordered"
      className="w-full text-black font-normal text-sm flex p-2 justify-between items-center bg-white"
      copyIcon={<CopyIcon />}
    >
      <p className="px-2 py-1">{text}</p>
    </Snippet>
  );
}

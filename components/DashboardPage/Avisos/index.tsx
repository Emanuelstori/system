"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { FaClipboardList, FaPencil } from "react-icons/fa6";
import AvisosModal from "./AvisosModal";
import parse from "html-react-parser";

export default function Avisos({
  advice,
}: {
  advice: {
    id: number;
    content: string;
    authorId: string;
    createdAt: Date;
  } | null;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <AvisosModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      {/* INICIO QUADRO DE AVISOS */}
      <div className="flex w-[calc(100%-32rem)] flex-col gap-2 items-start">
        <div className="flex justify-between w-full">
          <h1 className="flex gap-2 px-2 text-xl items-center">
            <FaClipboardList /> Quadro de avisos
          </h1>
          <Button isIconOnly color="primary" aria-label="Like" onPress={onOpen}>
            <FaPencil />
          </Button>
        </div>
        <div className="w-full bg-zinc-900 h-fit max-h-96 overflow-y-auto rounded-lg gap-2 p-4 ">
          {parse(advice!.content)}
        </div>
      </div>
      {/* FIM QUADRO DE AVISOS */}
    </>
  );
}

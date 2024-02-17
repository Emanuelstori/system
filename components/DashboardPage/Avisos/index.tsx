"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { FaClipboardList, FaPencil } from "react-icons/fa6";
import AvisosModal from "./AvisosModal";
import parse from "html-react-parser";
import { useUserContext } from "@/providers/UserProvider";
import { minLevelEditAdvice } from "@/constants";

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
  const currentUser = useUserContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      {currentUser!.roleLevel >= minLevelEditAdvice && (
        <AvisosModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}

      {/* INICIO QUADRO DE AVISOS */}
      <div className="flex max-sm:w-full md:w-[calc(100%-32rem)] flex-col gap-2 items-start">
        <div className="flex justify-between w-full">
          <h1 className="flex gap-2 px-2 text-xl items-center">
            <FaClipboardList /> Quadro de avisos
          </h1>
          {currentUser!.roleLevel >= minLevelEditAdvice && (
            <Button isIconOnly color="primary" onPress={onOpen}>
              <FaPencil size={15} />
            </Button>
          )}
        </div>
        <div className="w-full relative bg-zinc-900 h-fit max-h-96 overflow-y-auto rounded-lg gap-2 p-4 ">
          {parse(advice!.content)}
        </div>
      </div>
      {/* FIM QUADRO DE AVISOS */}
    </>
  );
}

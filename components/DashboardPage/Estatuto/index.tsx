"use client";

import "./quill.core.css";

import { Button, useDisclosure } from "@nextui-org/react";
import { FaPencil, FaPlus } from "react-icons/fa6";
import EstatutoModal from "./EstatutoModal";
import parse from "html-react-parser";
import { useUserContext } from "@/providers/UserProvider";
import { minLevelEditAdvice } from "@/constants";

export default function Estatuto({
  estatuto,
}: {
  estatuto: {
    id: number;
    title: string;
    description: string;
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
        <>
          <div className="absolute right-4 top-1 w-fit h-fit text-white">
            <Button isIconOnly color="primary" onPress={onOpen}>
              <FaPencil />
            </Button>
          </div>

          <EstatutoModal
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        </>
      )}

      {/* INICIO ESTATUTO */}
      <div className="w-full bg-zinc-900 overflow-y-auto max-h-[calc(100vh-4.9999rem)] p-5 container-estatuto">
        {estatuto && parse(estatuto.content)}
      </div>
      {/* FIM ESTATUTO */}
    </>
  );
}

"use client";
import ModalScripts from "./modals/ModalScripts";
import ModalAulas from "./modals/ModalAulas";
import ModalAddScripts from "./modals/ModalAddScripts";
import ModalClasses from "./modals/ModalClasses";
import { useDisclosure } from "@nextui-org/react";
import { ReactNode, useState } from "react";
import { Role } from "@prisma/client";

export default function ActionButtons({
  roles,
  classes,
  patentes,
  allUsers,
}: {
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
  classes: {
    id: number;
    title: string;
    description: string;
    content: string;
    aplicatorRoleId: number;
    createdAt: Date;
    authorId: string;
  }[];
  patentes: Role[];
  allUsers: {
    id: string;
    nick: string;
  }[];
}) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [content, setContent] = useState<string | undefined | ReactNode>(
    undefined
  );

  return (
    <>
      <div className="flex flex-col w-full gap-2 bg-cyan-500 bg-opacity-50 h-28 rounded p-2 justify-between">
        <ModalScripts
          makeOpenClass={onOpen}
          setContent={setContent}
          classes={classes}
        />
        <ModalAulas
          makeOpenClass={onOpen}
          setContent={setContent}
          classes={classes}
          patentes={patentes}
          allUsers={allUsers}
        />
        <ModalAddScripts roles={roles} />
        <ModalClasses
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          content={content}
        />
      </div>
    </>
  );
}

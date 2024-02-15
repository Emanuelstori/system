"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import UsersBox from "./UsersBox";
import RoleBox from "./RoleBox";
export default function ModalAddMember({
  userList,
  roles,
}: {
  userList: { nick: string }[];
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div
        onClick={onOpen}
        className="w-fit h-fit bg-blue-400 p-1 rounded hover:cursor-pointer hover:brightness-110 hover:scale-105"
      >
        <FaPlus />
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Adicionar Membro:
              </ModalHeader>
              <ModalBody>
                <UsersBox users={userList} />
                <RoleBox roles={roles} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

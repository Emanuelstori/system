"use client";

import React, { FormEvent, FormEventHandler } from "react";
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
import { Selection } from "@nextui-org/react";
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
  const [values, setValues] = React.useState<Selection>(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Array.from(values));
  };
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
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Adicionar Membro:
                </ModalHeader>
                <ModalBody>
                  <UsersBox
                    values={values}
                    setValues={setValues}
                    userList={userList}
                  />
                  <RoleBox roles={roles} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className="text-white"
                    color="success"
                    type="submit"
                    onPress={onClose}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
export default function ModalScripts({
  classes,
  setContent,
  makeOpenClass,
}: {
  classes: {
    id: number;
    title: string;
    description: string;
    content: string;
    aplicatorRoleId: number;
    createdAt: Date;
    authorId: string;
  }[];
  setContent: Dispatch<SetStateAction<string | undefined | ReactNode>>;
  makeOpenClass: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  return (
    <>
      <Button onClick={onOpen} color="primary">
        Scripts de aula
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Scripts:
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-around">
                  {classes.map((value, index) => (
                    <button
                      onClick={(e) => {
                        setContent(value.content);
                        makeOpenClass();
                      }}
                      key={index}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>
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
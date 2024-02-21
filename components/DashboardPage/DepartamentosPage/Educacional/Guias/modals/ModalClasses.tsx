"use client";

import "./aulas.css";

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import parse from "html-react-parser";

export default function ModalScripts({
  onOpen,
  isOpen,
  onClose,
  onOpenChange,
  content,
}: {
  onOpen: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  content: string | undefined | ReactNode;
}) {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="w-full bg-zinc-900 overflow-y-auto max-h-[calc(100vh-4.9999rem)] p-5 container-estatuto">
                  {content && typeof content === "string" && parse(content)}
                  {content && typeof content != "string" && content}
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

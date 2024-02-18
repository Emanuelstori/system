"use client";

import React, { FormEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import RoleBox from "./RoleBox";
import { Selection } from "@nextui-org/react";
import axios from "axios";
import TextEditor from "@/components/TextEditor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ModalAddScripts({
  roles,
}: {
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
}) {
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = React.useState<Selection>(new Set([]));
  const [valueEditor, setValueEditor] = React.useState<string | undefined>(
    undefined
  );
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(
    undefined
  );
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !value || !description || !valueEditor) {
      toast.error("Parâmetros esperados.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return;
    }

    const data = {
      title: title,
      content: valueEditor,
      role: Array.from(value)[0],
      description: description,
    };

    axios
      .post("/api/globalData/classes", data)
      .then((response) => {
        toast.success(response.data.toString(), {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
        onClose();
        return;
      })
      .catch((error) => {
        toast.error("Ocorreu algum erro!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer autoClose={5000} />
      <Button onPress={onOpen} color="primary">
        Adicionar aula
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Adicionar Aula:
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    placeholder="Nome da aula."
                    label="Nome"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                  />
                  <Input
                    isRequired
                    placeholder="Descrição da aula."
                    label="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                  <RoleBox value={value} setValue={setValue} roles={roles} />
                  <div className="bg-white max-h-[38rem] overflow-y-auto">
                    <TextEditor value={valueEditor} setValue={setValueEditor} />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button className="text-white" color="success" type="submit">
                    Enviar
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

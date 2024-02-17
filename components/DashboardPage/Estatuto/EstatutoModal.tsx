"use client";

import TextEditor from "@/components/TextEditor";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EstatutoModal({
  isOpen,
  onOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: {
      content: string;
    } = {
      content: value || "",
    };

    if (!payload.content || payload.content === "") {
      toast.error("Parâmetros esperados.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return;
    }

    const id = toast.loading("Criando Postagem...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    try {
      await axios.post("/api/globalData/estatuto", payload);
      toast.update(id, {
        render: "Criado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
      onClose();
      router.refresh();
    } catch (e) {
      toast.update(id, {
        render: "Algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
      console.log(e);
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Editar Estatuto
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <div className="h-fit bg-white w-[calc(100%-32rem)] max-h-[calc(100vh-20rem)] overflow-y-auto">
                  <TextEditor value={value} setValue={setValue} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fechar
              </Button>
              <Button color="primary" type="submit">
                Alterar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

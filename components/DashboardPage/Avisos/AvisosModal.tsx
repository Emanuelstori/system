"use client";

import TextEditor from "@/components/TextEditor";
import {
  Avatar,
  AvatarGroup,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function AvisosModal({
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
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [value, setValue] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(
    "http://habbo.com.br/habbo-imaging/badge/b27114s02130s01110s43114s191141920f434b8b01fb17be50479af8878de.gif"
  );
  const [selectedKey, setSelectedKey] = useState<"content" | "baseData">(
    "baseData"
  );
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
      await axios.post("/api/globalData/avisos", payload);
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
              Editar Aviso
            </ModalHeader>
            <ModalBody>
              <div className="w-full flex items-center justify-center">
                <div className="h-fit bg-white w-[calc(100%-32rem)]">
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

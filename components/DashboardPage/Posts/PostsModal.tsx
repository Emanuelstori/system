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

export default function PostsModal({
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

  function handleNext() {
    if (!postTitle || !postDescription) {
      toast.error("Preencha os campos obrigatórios para prosseguir.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return;
    } else {
      setTimeout(() => {
        setSelectedKey("content");
      }, 1);
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: {
      title: string;
      content: string;
      image?: string;
      description: string;
    } = {
      title: postTitle,
      description: postDescription,
      content: value || "",
    };

    if (!payload.title || !payload.content || !payload.description) {
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

    if (imagePreview) {
      payload.image = imagePreview;
    }
    try {
      await axios.post("/api/globalData/posts", payload);
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
              Criar Post
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={selectedKey}
                aria-label="Options"
                variant="light"
                className="w-full justify-center h-full hidden"
              >
                <Tab
                  key="baseData"
                  title="Informações básicas"
                  className="w-full flex justify-center items-center"
                >
                  <div className="flex">
                    <div className="flex items-center justify-center relative">
                      <label
                        htmlFor="imageInput"
                        className="relative cursor-pointer p-2 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        {imagePreview && (
                          <div className="relative group">
                            <div className="absolute inset-0 bg-black opacity-50 rounded flex items-center justify-center">
                              <FaPencil className="text-white text-4xl" />
                            </div>
                            <div className="w-56 h-auto">
                              <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="w-56 max-h-56 rounded"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        )}
                        <input
                          id="postImage"
                          name="postImage"
                          type="file"
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <div className="flex flex-col w-96 gap-2">
                      <div>
                        <label
                          htmlFor="titleInput"
                          className="relative cursor-pointer p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          Título:
                        </label>
                        <Input
                          isRequired
                          id="postTitle"
                          name="postTitle"
                          type="text"
                          label="Título"
                          value={postTitle}
                          onChange={(e) => setPostTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="descriptionInput"
                          className="relative cursor-pointer p-2 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                          Descrição:
                        </label>
                        <Input
                          isRequired
                          id="postDescription"
                          name="postDescription"
                          type="text"
                          label="Descrição"
                          value={postDescription}
                          onChange={(e) => setPostDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="content"
                  title="Conteúdo"
                  className="w-full flex flex-grow flex-col"
                >
                  <TextEditor value={value} setValue={setValue} />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              {selectedKey === "content" ? (
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => setSelectedKey("baseData")}
                >
                  Voltar
                </Button>
              ) : (
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              )}

              {selectedKey === "content" ? (
                <Button color="primary" type="submit">
                  Postar
                </Button>
              ) : (
                <Button color="primary" onClick={handleNext}>
                  Próximo
                </Button>
              )}
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

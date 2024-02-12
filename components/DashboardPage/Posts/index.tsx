"use client";
import PlaySound from "@/components/PlaySound";
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
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaLeftLong, FaPencil, FaPlus, FaRightLong } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import Pagination from "./Pagination";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
const { ptBR } = require("date-fns/locale");

export default function Posts({
  posts,
  maxPage,
}: {
  posts: Post[];
  maxPage: number;
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
      onclose;
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
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
      {/* INICIO POSTS */}
      <div className="flex flex-col gap-2 flex-grow items-start">
        <div className="flex justify-between w-full">
          <h1 className="flex gap-2 px-2 text-xl items-center">
            <IoNewspaper /> Posts
          </h1>
          <Button isIconOnly color="primary" aria-label="Like" onPress={onOpen}>
            <FaPlus />
          </Button>
        </div>
        <div className="w-full flex flex-wrap gap-8 justify-start">
          {posts.map((item, index) => (
            <div
              key={index}
              onMouseEnter={PlaySound}
              className="bg-zinc-900 hover:bg-zinc-950 max-sm:w-full hover:!bg-opacity-30 w-56 h-fit py-1 rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-250"
              style={{
                transition: "opacity 0.5s ease-in-out",
                opacity: 1,
              }}
            >
              <div className="p-2 h-32 w-full">
                <div className="relative w-full h-full rounded">
                  <Image
                    fill={true}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={item.image}
                    alt={""}
                  />
                </div>
              </div>
              <div className="w-full max-sm:items-start max-sm:px-4 flex flex-col gap-3 items-center justify-center">
                <div className="flex w-full px-3 flex-col gap-1">
                  <h1 className="font-bold">{item.title}</h1>
                  <p className="text-xs">{`${format(
                    item.createdAt,
                    "dd MMM yyyy",
                    {
                      locale: ptBR,
                    }
                  )}`}</p>
                </div>
                <div className="flex max-sm:!px-1 w-full justify-start px-4 text-xs text-justify">
                  {item.description}
                </div>
                <div className="w-full max-sm:!px-1 items-start justify-start px-4 py-2">
                  <AvatarGroup
                    onMouseEnter={PlaySound}
                    size="sm"
                    isBordered
                    max={3}
                    total={10}
                    className="justify-start"
                  >
                    <Avatar
                      size="sm"
                      onMouseEnter={PlaySound}
                      icon={
                        <Image
                          fill={true}
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3260-1394.hd-3103-8.ch-245-110.lg-3116-110-110.sh-906-92.ha-1009-1323.ea-5007.fa-1211.cc-3744-110-110&direction=2&head_direction=3&size=l&action=std,wav`}
                          alt={""}
                        />
                      }
                    />
                    <Avatar
                      onMouseEnter={PlaySound}
                      size="sm"
                      icon={
                        <Image
                          fill={true}
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3852-1398.hd-3099-1.ch-3076-110-110.lg-3006-110-110.sh-3064-110.he-3189-93.ca-3085-1410.cc-3634-110-64&direction=2&head_direction=3&size=l&action=std,wav`}
                          alt={""}
                        />
                      }
                    />
                    <Avatar
                      onMouseEnter={PlaySound}
                      size="sm"
                      icon={
                        <Image
                          fill={true}
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3852-1398.hd-3099-1.ch-3076-110-110.lg-3006-110-110.sh-3064-110.he-3189-93.ca-3085-1410.cc-3634-110-64&direction=2&head_direction=3&size=l&action=std,wav`}
                          alt={""}
                        />
                      }
                    />
                  </AvatarGroup>
                  <div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination maxPage={maxPage} />
      </div>
      {/* FIM POSTS */}
      <ToastContainer className="absolute" autoClose={5000} />
    </>
  );
}

async function getBase64Image(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

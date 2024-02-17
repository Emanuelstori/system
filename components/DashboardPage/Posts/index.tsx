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
import { FaPencil, FaPlus } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import Pagination from "./Pagination";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PostsModal from "./PostsModal";
const { ptBR } = require("date-fns/locale");

export default function Posts({
  posts,
  maxPage,
}: {
  posts: Post[];
  maxPage: number;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <PostsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
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

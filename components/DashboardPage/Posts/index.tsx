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
import { ChangeEvent, useEffect, useState } from "react";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";
import Pagination from "./Pagination";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PostsModal from "./PostsModal";
import { useUserContext } from "@/providers/UserProvider";
import { minLevelCreatePost } from "@/constants";
const { ptBR } = require("date-fns/locale");

export default function Posts({
  posts,
  maxPage,
}: {
  posts: ({
    watchedBy: {
      user: {
        nick: string;
      };
    }[];
  } & {
    id: number;
    image: string;
    title: string;
    description: string;
    content: string;
    likes: number;
    dislikes: number;
    authorId: string;
    createdAt: Date;
  })[];
  maxPage: number;
}) {
  const currentUser = useUserContext();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { push } = useRouter();
  return (
    <>
      {currentUser!.roleLevel >= minLevelCreatePost && (
        <PostsModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
      {/* INICIO POSTS */}
      <div className="flex max-sm:w-full md:w-[calc(100%-32rem)] flex-col gap-2 items-start">
        <div className="flex justify-between w-full">
          <h1 className="flex gap-2 px-2 text-xl items-center">
            <IoNewspaper /> Posts
          </h1>
          {currentUser!.roleLevel >= minLevelCreatePost && (
            <Button
              isIconOnly
              color="primary"
              aria-label="Like"
              onPress={onOpen}
            >
              <FaPlus />
            </Button>
          )}
        </div>
        <div className="w-full flex flex-wrap gap-8 justify-around">
          {posts.map((item, index) => (
            <div
              key={index}
              onClick={() => push(`/dashboard/posts/${item.title}`)}
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
                  {item.watchedBy.length > 0 ? (
                    <AvatarGroup
                      onMouseEnter={PlaySound}
                      size="sm"
                      isBordered
                      max={3}
                      total={item.watchedBy.length - 3}
                      className="justify-start"
                    >
                      {item.watchedBy.map((itm, idx) => (
                        <AvatarItem key={idx} user={itm.user} />
                      ))}
                    </AvatarGroup>
                  ) : (
                    <div className="h-fit py-1">Ninguém viu ainda</div>
                  )}
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

interface AvatarItemProps {
  user: {
    nick: string;
  };
}

const AvatarItem: React.FC<AvatarItemProps> = ({ user }) => {
  const [figureData, setFigureData] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await fetch(
        `https://www.habbo.com.br/api/public/users?name=${user.nick}`
      );
      const data = await response.json();
      setFigureData(data.figureString); // assuming figureData is the correct property in the API response
    };
    fetchAvatar();
  }, [user]);

  if (!figureData) {
    return <div>Loading...</div>;
  }

  return (
    <Avatar
      onMouseEnter={PlaySound}
      size="sm"
      icon={
        <Image
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureData}&direction=2&head_direction=3&size=l&action=std,wav`}
          alt={""}
        />
      }
    />
  );
};

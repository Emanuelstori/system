"use client";
import PlaySound from "@/components/PlaySound";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import Image from "next/image";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { IoNewspaper } from "react-icons/io5";

export default function Posts({ posts }: { posts: {}[] }) {
  return (
    <>
      {/* INICIO POSTS */}
      <div className="flex flex-col gap-2 w-fit items-start">
        <h1 className="flex gap-2 px-2 text-xl items-center">
          <IoNewspaper /> Posts
        </h1>
        <div className="w-fit flex flex-wrap gap-8 justify-start">
          {posts.map((item, index) => (
            <div
              key={index}
              onMouseEnter={PlaySound}
              className="bg-zinc-900 hover:bg-zinc-950 max-sm:w-full hover:!bg-opacity-30 w-56 h-fit py-1 rounded-md hover:cursor-pointer hover:scale-105 transition-all duration-250"
            >
              <div className="p-2 h-32 w-full">
                <div className="relative w-full h-full rounded">
                  <Image
                    fill={true}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={`https://i.pinimg.com/736x/f0/52/40/f05240a1f188ae7d5849091a664381b1.jpg`}
                    alt={""}
                  />
                </div>
              </div>
              <div className="w-full max-sm:items-start max-sm:px-4 flex flex-col gap-3 items-center justify-center">
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold">Guide to Photography</h1>
                  <p className="text-xs">11 de Janeiro 2024</p>
                </div>
                <div className="flex max-sm:!px-1 w-full justify-start px-4 text-xs text-justify">
                  Let me start off by saying you can do this! It will be hard
                  work but isn&apos;t impossible.
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
        <div className="flex w-full items-end justify-start md:justify-end flex-wrap">
          <Button
            onMouseEnter={PlaySound}
            radius="none"
            variant="bordered"
            className="p-2 rounded-l-md flex gap-1 items-center hover:border-violet-600 transition-all duration-250"
          >
            <FaLeftLong className="group-hover:fill-violet-400 transition-all duration-250" />
          </Button>
          <Button
            onMouseEnter={PlaySound}
            radius="none"
            variant="bordered"
            className="p-2 rounded-r-md flex gap-1 items-center hover:border-violet-600 transition-all duration-250"
          >
            <FaRightLong className="group-hover:fill-violet-400 transition-all duration-250" />
          </Button>
        </div>
      </div>
      {/* FIM POSTS */}
    </>
  );
}

"use client";

import { FaPencil, FaRankingStar } from "react-icons/fa6";
import Image from "next/image";
import PlaySound from "@/components/PlaySound";
import { Button } from "@nextui-org/react";

export default function Destaques() {
  return (
    <>
      {/* INICIO DESTAQUES */}
      <div className="bg-zinc-900 max-sm:w-full flex flex-col gap-6 bg-opacity-50 rounded-xl p-4 w-96 h-fit">
        <div className="flex w-full justify-between items-center">
          <h1 className="flex gap-2 px-2 items-center text-xl">
            <FaRankingStar /> Destaques
          </h1>
          <Button isIconOnly color="primary">
            <FaPencil />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div
            onMouseEnter={PlaySound}
            className="flex w-full bg-blue-500 h-20 rounded-md hover:cursor-pointer hover:bg-green-500 transition-all duration-250"
          >
            <div className="w-full flex items-center h-20 rounded-md">
              <div className="relative w-20 h-20 p-1">
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill={true}
                  className="p-1"
                  style={{ objectFit: "cover" }}
                  src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3852-1398.hd-3099-1.ch-3076-110-110.lg-3006-110-110.sh-3064-110.he-3189-93.ca-3085-1410.cc-3634-110-64&direction=3&head_direction=3&gesture=sml&action=std,crr=667`}
                  alt={""}
                />
              </div>
              <div>
                <p>B.L.P.S</p>
                <p>Diretora Geral - {process.env.NEXT_PUBLIC_POLICE_NAME}</p>
              </div>
            </div>
            <div className="w-fit flex h-full items-center px-2">
              <div className="relative w-16 h-14 p-1">
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill={true}
                  className="p-1"
                  style={{ objectFit: "cover" }}
                  src={`https://www.habbo.com.br/habbo-imaging/badge/b07104s36134s44014s411340aa4fc4aaafc7a8ab371cf429a05a155.gif`}
                  alt={""}
                />
              </div>
            </div>
          </div>
          <div
            onMouseEnter={PlaySound}
            className="flex w-full bg-blue-500 h-20 rounded-md hover:cursor-pointer hover:bg-green-500 transition-all duration-250"
          >
            <div className="w-full flex items-center h-20 rounded-md">
              <div className="relative w-20 h-20 p-1">
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill={true}
                  className="p-1"
                  style={{ objectFit: "cover" }}
                  src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3829-42.hd-180-1.ch-210-1408.lg-285-64.sh-300-64.ea-3484.cc-260-1408&direction=3&head_direction=3&gesture=sml&action=std,crr=667`}
                  alt={""}
                />
              </div>
              <div>
                <p>lucastecm</p>
                <p>Diretor - {process.env.NEXT_PUBLIC_POLICE_NAME}</p>
              </div>
            </div>
            <div className="w-fit flex h-full items-center px-2">
              <div className="relative w-16 h-14 p-1">
                <Image
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill={true}
                  className="p-1"
                  style={{ objectFit: "cover" }}
                  src={`https://www.habbo.com.br/habbo-imaging/badge/b07104s36134s44024s411345bbf1b8611c74d5372435dac43eff397.gif`}
                  alt={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FIM DESTAQUES */}
    </>
  );
}

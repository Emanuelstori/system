"use client";

import { FaTrophy } from "react-icons/fa6";
import Image from "next/image";
import PlaySound from "@/components/PlaySound";
import { Button } from "@nextui-org/react";

export default function Ranking() {
  return (
    <>
      {/* INICIO RANKING */}
      <div className="flex flex-col gap-2 w-96 h-fit">
        <div className="bg-zinc-900 max-sm:w-full max-sm:!px-1 flex flex-col gap-6 bg-opacity-50 rounded-xl p-4 w-96 h-fit">
          <div>
            <h1 className="flex gap-2 px-2 items-center text-xl">
              <FaTrophy /> Ranking Semanal
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            <div
              onMouseEnter={PlaySound}
              className="flex w-full bg-blue-500 h-10 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-all duration-250 justify-between"
            >
              <div className="w-max flex items-center h-10 rounded-md">
                <div className="relative w-14 h-12 p-1">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill={true}
                    className="p-1"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 50%",
                    }}
                    src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&figure=hr-3852-1398.hd-3099-1.ch-3076-110-110.lg-3006-110-110.sh-3064-110.he-3189-93.ca-3085-1410.cc-3634-110-64&direction=3&head_direction=3&size=m&gesture=srp&headonly=1`}
                    alt={""}
                  />
                </div>
                <div>
                  <p>B.L.P.S</p>
                </div>
              </div>
              <div className="w-fit flex h-full items-center px-2">
                <p className="flex">12 Pontos</p>
                <div className="relative w-8 h-8 p-1">
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
              className="flex w-full bg-blue-500 h-10 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-all duration-250 justify-between"
            >
              <div className="w-max flex items-center h-10 rounded-md">
                <div className="relative w-14 h-12 p-1">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill={true}
                    className="p-1"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 50%",
                    }}
                    src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3829-42.hd-180-1.ch-210-1408.lg-285-64.sh-300-64.ea-3484.cc-260-1408&direction=3&head_direction=3&headonly=1`}
                    alt={""}
                  />
                </div>
                <div>
                  <p>lucastecm</p>
                </div>
              </div>
              <div className="w-fit flex h-full items-center px-2">
                <p className="flex">9 Pontos</p>
                <div className="relative w-8 h-8 p-1">
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
              className="flex w-full bg-blue-500 h-10 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-all duration-250 justify-between"
            >
              <div className="w-max flex items-center h-10 rounded-md">
                <div className="relative w-14 h-12 p-1">
                  <Image
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill={true}
                    className="p-1"
                    style={{
                      objectFit: "cover",
                      objectPosition: "50% 50%",
                    }}
                    src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-170-42.hd-209-1.ch-225-66.lg-285-64.sh-300-1408.cc-260-66&direction=3&head_direction=3&headonly=1`}
                    alt={""}
                  />
                </div>
                <div>
                  <p>aquil02</p>
                </div>
              </div>
              <div className="w-fit flex h-full items-center px-2">
                <p className="flex">8 Pontos</p>
                <div className="relative w-8 h-8 p-1">
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
            <Button onMouseEnter={PlaySound} className="bg-blue-800 mt-1">
              Ranking Completo
            </Button>
          </div>
        </div>
      </div>
      {/* FIM RANKING */}
    </>
  );
}

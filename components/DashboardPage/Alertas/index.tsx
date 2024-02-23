"use client";

import Image from "next/image";
//&direction=2&head_direction=3&size=l&action=std,wav

export default function Alertas() {
  return (
    <div className="flex w-full md:w-fit h-fit bg-black rounded-lg bg-opacity-50">
      <div className="w-5 h-20 bg-green-500 rounded-l-lg"></div>
      <div className="relative w-20 h-20 p-1">
        <Image
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="p-1"
          style={{ objectFit: "cover" }}
          src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3260-1394.hd-3103-8.ch-245-110.lg-3116-110-110.sh-906-92.ha-1009-1323.ea-5007.fa-1211.cc-3744-110-110&direction=2&head_direction=3&size=l&action=std,wav`}
          alt={""}
        />
      </div>
      <div className="flex flex-col p-2 !pr-8 max-w-56 max-h-20">
        <p>ALERTA</p>
        <p className="text-sm">Reunião geral domingo! Reunião geral domingo!</p>
      </div>
    </div>
  );
}

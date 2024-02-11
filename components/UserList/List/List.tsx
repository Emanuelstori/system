"use client";
import ShowData from "./ShowData";
import { useState } from "react";

export default function List({
  patentes,
}: {
  patentes: dataPatentes[] | null;
}) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  if (!patentes) {
    return <></>;
  }

  const toggleOpen = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      {patentes?.map((patente, index) => (
        <div key={index} className="w-full flex flex-col">
          <div
            onClick={() => toggleOpen(index)}
            className={`sm:w-full md:w-[calc(100%-10rem)] flex items-center p-2 bg-blue-400 h-10 ${
              openIndexes.includes(index) ? "rounded-t-lg ease-in-out" : "rounded-lg ease-in-out"
            } `}
          >
            {patente.role}
          </div>
          <ShowData
            profiles={patente.profiles}
            isOpen={openIndexes.includes(index)}
          />
        </div>
      ))}
    </>
  );
}

interface dataPatentes {
  id: number;
  role: string;
  roleLevel: number;
  createdAt: Date;
  profiles: dataProfiles[]; // Agora é um array de dataProfiles
}

interface dataProfiles {
  id: string;
  tag: string | null;
  salary: number;
  warnings: number;
  identity: string;
  roleId: number;
  companyId: number | null;
  awardedId: number | null;
  user: User;
}

type User = {
  id: string;
  nick: string;
  email: string | null;
  password: string | null;
  createdAt: Date;
  active: boolean;
  figureData?: string; // Adicionando o campo para armazenar o URL da imagem do usuário
};


async function getUserImage({ nick }: { nick: string }) {
  const res = await fetch(
    `https://www.habbo.com.br/api/public/users?name=${nick}`
  );
  const { figureString } = await res.json();
  if (figureString === undefined) {
    return `https://cdn.discordapp.com/attachments/1205259247387025439/1205259311425527828/Z.png?ex=65d7b834&is=65c54334&hm=9a9496c65db40cd6d01f1ea00e891adf679ef32caa16517eafdff83318e74ca2&`;
  }
  return `https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureString}&direction=2&head_direction=3&size=l&action=std`;
}


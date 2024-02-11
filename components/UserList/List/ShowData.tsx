"use client";
import { Transition } from "@headlessui/react";

export default function ShowData({
  profiles,
  isOpen,
}: {
  profiles: dataProfiles[];
  isOpen: boolean;
}) {
  return (
    <>
      <Transition
        show={isOpen}
        enter="transition-all duration-300"
        enterFrom="opacity-0 max-h-0"
        enterTo="opacity-100 max-h-screen"
        leave="transition-all duration-300"
        leaveFrom="opacity-100 max-h-screen"
        leaveTo="opacity-0 max-h-0"
      >
        <div className="sm:w-full md:w-[calc(100%-10rem)] bg-zinc-900 h-fit rounded-b-lg">
          <div className="flex w-fit flex-wrap">
            {profiles.map((profile, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-fit p-2"
              >
                <img src={profile.user.figureData!} alt="" />
                <p>{profile.user.nick}</p>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </>
  );
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

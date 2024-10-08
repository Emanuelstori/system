"use client";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ShowData({
  profiles,
  isOpen,
}: {
  profiles: Profiles[];
  isOpen: boolean;
}) {
  const route = useRouter();
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
                className="flex flex-col justify-center items-center w-fit p-2 hover:cursor-pointer"
                onClick={() =>
                  route.push(`/dashboard/profile/${profile.user.nick}`)
                }
              >
                <div className="relative h-20 w-20">
                  <Image
                    src={profile.user.figureData!}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
                <p>{profile.user.nick}</p>
              </div>
            ))}
          </div>
        </div>
      </Transition>
    </>
  );
}
type User = {
  figureData?: string;
  nick: string;
};
type Profiles = {
  user: User;
};

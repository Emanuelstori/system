"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { RelatoryType } from "@prisma/client";
import VerticalTimeLine from "./Timeline/VerticalTimeLine";

export default function UserDataTimes({
  relatories,
  userData,
}: {
  relatories: MyRelatoryType[] | undefined;
  userData: any;
}) {
  return (
    <div className="flex w-full flex-col items-center border-b-1 border-black px-4">
      <Tabs
        aria-label="Options"
        variant="light"
        className="w-full flex justify-center"
      >
        <Tab key="timeline" title="Linha do tempo" className="w-full">
          <VerticalTimeLine
            relatories={userData.Profile?.targetedRelatories}
            userData={userData}
          />
        </Tab>
        <Tab key="courses" title="Cursos" className="w-full">
          <div></div>
        </Tab>
        <Tab key="posts" title="Postagens" className="w-full">
          <div></div>
        </Tab>
      </Tabs>
    </div>
  );
}

interface MyRelatoryType {
  title: string;
  createdAt: Date;
  relatoryType: RelatoryType;
  accepted: boolean;
  description: string | null;
  author: {
    user: {
      nick: string;
    };
  };
}

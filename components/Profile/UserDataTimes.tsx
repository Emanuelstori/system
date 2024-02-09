"use client";

import { Tabs, Tab } from "@nextui-org/react";
import { RelatoryType } from "@prisma/client";
import { format } from "date-fns";
import VerticalTimeLine from "../ProfilePage/VerticalTimeLine";
const { ptBR } = require("date-fns/locale");

export default function UserDataTimes({
  relatories,
  userData,
}: {
  relatories: MyRelatoryType[] | undefined;
  userData: any;
}) {
  return (
    <div className="flex w-full flex-col items-center border-b-1 border-black px-4">
      <Tabs aria-label="Options" variant="light" className="w-full">
        <Tab key="timeline" title="Linha do tempo" className="w-56">
          <VerticalTimeLine
            relatories={userData.Profile?.targetedRelatories}
            userData={userData}
          />
        </Tab>
        <Tab key="courses" title="Cursos" className="w-56">
          <div></div>
        </Tab>
        <Tab key="posts" title="Postagens" className="w-56">
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

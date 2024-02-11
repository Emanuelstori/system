"use server";

import prisma from "@/prisma/client";
import UserInfo from "@/components/ProfilePage/UserInfo";
import { format } from "date-fns";

import Identificacao from "@/components/ProfilePage/Identificacao";
import UserDataTimes from "@/components/ProfilePage/UserDataTimes";
const { ptBR } = require("date-fns/locale");

export default async function Page({
  params,
}: {
  params: { nickname: string };
}) {
  const userData = await getUserData({
    nickname: decodeURIComponent(params.nickname),
  });
  if (!userData) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        Usuário não encontrado
      </div>
    );
  }
  const res = await fetch(
    `https://www.habbo.com.br/api/public/users?name=${userData.nick}`
  );
  const { figureString, online } = await res.json();
  return (
    <div className="w-full px-8 py-4">
      <div className="flex w-full justify-center gap-16">
        <div className="flex w-fit h-fit">
          <div className="flex flex-col w-96 bg-white rounded-md text-black font-bold">
            <div className="flex justify-center p-3 w-full border-b-1 bg-blue-400 rounded-t-md border-black">
              Identidade Policial
            </div>
            <div className="flex flex-col w-full h-fit">
              <div className="flex w-full items-center justify-center p-2">
                <div className="flex border-b-1 w-full justify-center">
                  <img
                    src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureString}&direction=3&head_direction=3`}
                  />
                  <img
                    src={`https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureString}&direction=7&head_direction=7`}
                  />
                </div>
              </div>
              <div>
                <UserInfo userData={userData} online={online} />
              </div>
              <div className="w-full flex p-2">
                <div className="flex flex-col w-full">
                  <div className="w-full text-white flex p-2 justify-between items-center bg-zinc-900">
                    <p className="px-2 py-1">IDENTIFICAÇÃO</p>{" "}
                    <p className="px-2 py-1">COPIAR</p>
                  </div>

                  <div className="w-full text-black font-normal text-sm flex p-2 justify-between items-center bg-white">
                    <Identificacao
                      text={`${userData.nick} [${
                        userData.Profile!.tag
                      }] ${format(userData.createdAt, "dd MMM yyyy", {
                        locale: ptBR,
                      })}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-96 overflow-auto">
          <UserDataTimes
            relatories={userData.Profile?.targetedRelatories}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
}

async function getUserData({ nickname }: { nickname: string }) {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        nick: nickname,
      },
      select: {
        nick: true,
        active: true,
        createdAt: true,
        Profile: {
          select: {
            tag: true,
            salary: true,
            role: {
              select: {
                role: true,
              },
            },
            targetedRelatories: {
              select: {
                title: true,
                accepted: true,
                author: {
                  select: {
                    user: {
                      select: {
                        nick: true,
                      },
                    },
                  },
                },
                description: true,
                createdAt: true,
                relatoryType: true,
              },
            },
          },
        },
      },
    });
    if (userData) return userData;
    return null;
  } catch (err) {
    console.log(err);
  } finally {
    prisma.$disconnect();
  }
}

"use server";

import prisma from "@/prisma/client";
import UserInfo from "@/components/ProfilePage/UserInfo";
import { format } from "date-fns";
import SetPoints from "@/components/SetPoints/SetPoints";
import Identificacao from "@/components/ProfilePage/Identificacao";
import UserDataTimes from "@/components/ProfilePage/UserDataTimes";
const { ptBR } = require("date-fns/locale");
import { minLevelEditUser } from "@/constants";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { getUserData } from "@/utils/getUserData";
import { $Enums } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: { nickname: string };
}) {
  const userData = await getUserProfileData({
    nickname: decodeURIComponent(params.nickname),
  });
  const userCanRegister = await getUserCanRegister({
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
  let renderSetPoint: boolean = false;

  const currentUserData = await getUserData();

  if (
    currentUserData &&
    currentUserData.Profile &&
    currentUserData.Profile.role.roleLevel >= minLevelEditUser
  ) {
    renderSetPoint = true;
  }

  return (
    <div className="w-full px-8 py-4">
      <div
        className={
          renderSetPoint
            ? "flex w-full justify-around gap-1 flex-wrap"
            : "flex w-full justify-center gap-16 flex-wrap"
        }
      >
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
                <UserInfo
                  userCanRegister={userCanRegister}
                  userData={userData}
                  online={online}
                />
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

        {renderSetPoint ? (
          <SetPoints userData={userData} />
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </div>
      <ToastContainer className="absolute" autoClose={5000} />
    </div>
  );
}

async function getUserProfileData({ nickname }: { nickname: string }) {
  try {
    const userData = await prisma.user.findFirst({
      orderBy: {
        createdAt: "desc",
      },
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
            points: true,
            id: true,
            role: {
              select: {
                role: true,
                roleLevel: true,
              },
            },
            targetedRelatories: {
              where: {
                AND: [
                  {
                    NOT: {
                      relatoryType: "CLASS_APPLICATION",
                    },
                  },
                  {
                    NOT: {
                      relatoryType: "GET_DAILY_PRESENCE",
                    },
                  },
                ],
              },
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

async function getUserCanRegister({ nickname }: { nickname: string }): Promise<{
  id: number;
  title: string;
  relatoryType: $Enums.RelatoryType;
  accepted: boolean;
  description: string | null;
  createdAt: Date;
  acceptedAt: Date | null;
  profileId: string;
} | null> {
  try {
    const data = await prisma.relatory.findFirst({
      where: {
        AND: [
          {
            targets: {
              some: {
                user: {
                  nick: nickname,
                },
              },
            },
            relatoryType: "USER_ACCESS",
          },
        ],
      },
    });
    if (data) return data;
    return null;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

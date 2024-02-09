"use server";
import { AxiosError } from "axios";
import prisma from "@/prisma/client";
import { BsShieldFillCheck, BsShieldFillX } from "react-icons/bs";
import { cookies } from "next/headers";
import { COOKIE_NAME, minLevelCreateUser, minLevelEditUser } from "@/constants";
import { verify } from "jsonwebtoken";
import Pagination from "./Pagination";
import ButtonSeeProfile from "@/components/ButtonSeeProfile";
import ButtonEditProfile from "../ButtonEditProfile";
import { createUser } from "./actions";
import UserCreation from "./UserCreation/index";
import CreateUserbutton from "./UserCreation/CreateUserbutton";
import CloseModalButton from "./UserCreation/CloseModalButton";
import { Role } from "@prisma/client";

export default async function UserList({
  page,
  showModal,
}: {
  page?: number;
  showModal?: boolean;
}) {
  const users = await getUsers({ page: page });
  const userInfo = await getUserInfo();
  const maxPage = await getMaxPage();
  const patentes = await getPatentes();

  return (
    <div className="w-full flex-col gap-4 flex flex-wrap items-center justify-center">
      {userInfo.data.roleLevel >= minLevelCreateUser && (
        <div
          className={`fixed ${
            showModal ? "" : "hidden"
          } top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50`}
        >
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex gap-8 flex-col w-96 h-96 bg-zinc-900 rounded-xl px-4 py-3">
              <div className="flex w-full justify-between">
                <div>Adicionar Usuário</div>
                <CloseModalButton />
              </div>
              <form className="flex flex-col gap-4" action={createUser}>
                <UserCreation patentes={patentes!} />
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-full items-center justify-center flex flex-col flex-wrap gap-4 px-10">
        <div className="fixed top-20 right-10">
          <CreateUserbutton />
        </div>
        <div className="flex max-w-full flex-wrap gap-4 pt-10 items-center justify-center">
          {users?.map((user, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center items-center max-h-34 w-96 rounded-lg pb-0 max-sm:!pb-4 bg-slate-900 pr-8 pl-2"
            >
              <div className="flex w-20 h-full items-center justify-center overflow-hidden">
                {user.nick == userInfo.data.username ? (
                  <img
                    className="object-cover object-top"
                    src={user.figureString}
                    alt={""}
                  />
                ) : (
                  <img
                    className="object-cover object-top"
                    src={user.figureString}
                    alt={""}
                  />
                )}
              </div>
              <div className="flex flex-wrap h-full items-start p-2 justify-center gap-2 flex-col">
                <p className="text-sm">{user.nick}</p>
                <div className="h-fit">
                  <div className="flex flex-wrap gap-1 items-center">
                    <div className="relative w-4 h-4">
                      <img
                        src={
                          "https://www.habbo.com.br/habbo-imaging/badge/b27134s02124s43117s36044s390142e429af27a46db5f75ab6e58e30af4df.gif"
                        }
                        alt={""}
                      />
                    </div>
                    <p>{user.Profile?.role.role}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    {user.active ? (
                      <>
                        <BsShieldFillCheck className="fill-green-500" />
                        <p>Ativo</p>
                      </>
                    ) : (
                      <>
                        <BsShieldFillX className="fill-red-500" />
                        <p>Inativo</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap flex-col gap-1 w-max items-center justify-center ml-4">
                <ButtonSeeProfile nickname={user.nick} />
                {userInfo?.data.roleLevel! >= minLevelEditUser ||
                userInfo?.data.username === user.nick ? (
                  <ButtonEditProfile />
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination maxPage={maxPage} />
    </div>
  );
}

type User = {
  nick: string;
  active: boolean;
  figureString: string;
  Profile: {
    role: {
      role: string;
    };
  } | null;
};

type UserList = User[];

async function getUsers({
  page,
}: {
  page: number | undefined;
}): Promise<User[] | null> {
  var pageNumber = page || 1;
  let skipValue;
  if (pageNumber > 1) {
    skipValue = pageNumber - 2 + 20;
  } else {
    skipValue = 0;
  }
  pageNumber < 1 && (pageNumber = 1);
  try {
    const users = await prisma.user.findMany({
      skip: skipValue,
      take: 20,
      orderBy: [
        {
          Profile: {
            role: {
              roleLevel: "desc",
            },
          },
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        nick: true,
        active: true,
        Profile: {
          select: {
            role: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
    const usersWithFigureStrings = await Promise.all(
      users.map(async (user) => {
        const { nick } = user;
        const figureString = await getUserImage({ nick });
        return { ...user, figureString };
      })
    );
    return usersWithFigureStrings;
  } catch (e) {
    const error = e as AxiosError;
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getUserInfo(): Promise<any> {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) return;

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  const payload = verify(value, secret);

  const response = {
    payload,
  };
  return response.payload;
}

async function getMaxPage() {
  try {
    const maxPage = await prisma.user.count();
    return maxPage;
  } catch (e) {
    const error = e as AxiosError;
    return null;
  } finally {
    prisma.$disconnect();
  }
}

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

async function getPatentes(): Promise<Role[] | null> {
  try {
    const patentes = await prisma.role.findMany({
      orderBy: {
        roleLevel: "asc",
      },
    });
    return patentes;
  } catch (e) {
    const error = e as AxiosError;
    return null;
  } finally {
    prisma.$disconnect();
  }
}

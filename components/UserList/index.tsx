"use server";
import { AxiosError } from "axios";
import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import { COOKIE_NAME, minLevelCreateUser } from "@/constants";
import { verify } from "jsonwebtoken";
import { createUser } from "./actions";
import UserCreation from "./UserCreation/index";
import CreateUserbutton from "./UserCreation/CreateUserbutton";
import CloseModalButton from "./UserCreation/CloseModalButton";
import List from "./List/List";

export default async function UserList({ showModal }: { showModal?: boolean }) {
  const userInfo = await getUserInfo();
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
      <div className="w-full items-center justify-center flex flex-col flex-wrap gap-4 px-10">
        <div className="max-sm:!flex md:fixed top-20 right-10">
          <CreateUserbutton />
        </div>
        <div className="flex w-full flex-wrap gap-4 pt-10 items-center justify-center">
          <List patentes={patentes} />
        </div>
      </div>
    </div>
  );
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

async function getPatentes(): Promise<dataPatentes[] | null> {
  try {
    const patentes = await prisma.role.findMany({
      orderBy: {
        roleLevel: "desc",
      },
      include: {
        profiles: {
          include: {
            user: true,
          },
        },
      },
    });

    // Busca as imagens dos usuários e as adiciona aos perfis
    const patentesComImagens = await Promise.all(
      patentes.map(async (patente) => {
        const profilesComImagens = await Promise.all(
          patente.profiles.map(async (profile) => {
            const figureData = await getUserImage(profile.user);
            return { ...profile, user: { ...profile.user, figureData } };
          })
        );
        return { ...patente, profiles: profilesComImagens };
      })
    );

    return patentesComImagens;
  } catch (e) {
    const error = e as AxiosError;
    console.error("Erro ao buscar patentes com imagens de usuários:", error);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getUserImage(user: User): Promise<string> {
  try {
    const res = await fetch(
      `https://www.habbo.com.br/api/public/users?name=${user.nick}`
    );
    const { figureString } = await res.json();
    if (!figureString) {
      return "https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=hr-3531-1395-37.hd-3092-10.ch-3077-1332-110.lg-285-110.sh-300-92.ea-3484.fa-1206-92.ca-1811.cc-3007-1332-1332&direction=2&head_direction=3&size=l&action=std";
    }
    return `https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureString}&direction=2&head_direction=3&size=l&action=std`;
  } catch (error) {
    console.error("Erro ao buscar imagem do usuário:", error);
    return "URL_PARA_IMAGEM_PADRAO_SE_ERRO";
  }
}

interface dataPatentes {
  id: number;
  role: string;
  roleLevel: number;
  createdAt: Date;
  profiles: dataProfiles[];
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

/* 
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
          */

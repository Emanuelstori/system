import ActionButtons from "@/components/DashboardPage/DepartamentosPage/Educacional/Guias/ActionButtons";
import Cards from "@/components/DashboardPage/DepartamentosPage/Educacional/Guias/Cards";
import Memberlist from "@/components/DashboardPage/DepartamentosPage/Educacional/Guias/Memberlist";
import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EducacitionalPage() {
  var success = false;
  var error = false;
  const currentUser = await getUserData();
  const userList = await getUsers();
  const roles = await getRoles();
  if (!userList || !roles || !currentUser) {
    redirect("/dashboard/departamentos/educacional");
  }
  if (
    currentUser &&
    currentUser.Profile &&
    currentUser.Profile.role.roleLevel >= 1000
  ) {
    success = true;
  } else {
    if (currentUser) {
      const verifyMemberOfGuias = await verifyMember();
      if (verifyMemberOfGuias) {
        const containsUser = verifyMemberOfGuias[0].profiles.some(
          (profile: Profile) => {
            return profile.user.nick === currentUser.nick;
          }
        );
        if (containsUser) {
          success = true;
        } else {
          redirect("/dashboard/departamentos/educacional");
        }
      }
    }
  }
  if (!success) {
    return <div>Carregando.</div>;
  } else {
    return (
      <>
        <div className="flex w-full gap-16">
          <div className="w-full flex flex-col gap-8 h-full">
            <Cards />
            <div className="w-full bg-zinc-950 bg-opacity-50 h-full p-2">
              Histórico de atividade
            </div>
          </div>
          <div className="flex flex-col w-52 gap-8 h-full">
            <ActionButtons />
            <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
              quadro de avisos
            </div>
            <Memberlist roles={roles} userList={userList} />
          </div>
        </div>
      </>
    );
  }
}
async function verifyMember(): Promise<{ profiles: Profile[] }[] | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    const headersList = headers();
    const domain = headersList.get("host");

    if (!token) {
      return null;
    }
    const data = await axios.post(
      `http://${domain}/api/company/member/getmember`,
      {
        name: "DpE",
      },
      {
        headers: {
          Cookie: `${COOKIE_NAME}=${token.value}`,
        },
      }
    );
    return data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

interface Profile {
  user: { nick: string };
  role: { role: string; roleLevel: number };
}

async function getUsers(): Promise<{ nick: string }[] | null> {
  try {
    const users = await prisma.user.findMany({
      select: {
        nick: true,
      },
    });
    return users;
  } catch (e) {
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getRoles(): Promise<
  | {
      id: number;
      role: string;
      companyId: number;
      createdAt: Date;
    }[]
  | null
> {
  try {
    const res = await prisma.companyRole.findMany({
      where: {
        company: {
          name: "DpE",
        },
      },
    });
    return res;
  } catch (e) {
    return null;
  } finally {
    prisma.$disconnect();
  }
}

export async function getUserData(): Promise<UserType> {
  const headersList = headers();
  const domain = headersList.get("host");
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`http://${domain}/api/auth/me`, {
      headers: {
        Cookie: `${COOKIE_NAME}=${token.value}`,
      },
    });
    const data = await res.json();
    if (data) {
      try {
        const userData = await prisma.user.findFirst({
          where: {
            id: data.payload.data.id,
          },
          select: {
            id: true,
            nick: true,
            active: true,
            Profile: {
              select: {
                role: {
                  select: {
                    role: true,
                    roleLevel: true,
                  },
                },
              },
            },
          },
        });
        return userData;
      } catch (err) {
        console.log(err);

        return null;
      } finally {
        prisma.$disconnect();
      }
    }
    return null;
  } catch (e) {
    console.log(e);

    return null;
  }
}

type UserType = {
  id: string;
  nick: string;
  active: boolean;
  Profile: {
    role: {
      role: string;
      roleLevel: number;
    };
  } | null;
} | null;

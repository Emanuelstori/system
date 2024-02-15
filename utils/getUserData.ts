import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import axios, { AxiosError } from "axios";
import { cookies, headers } from "next/headers";

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
    const error = e as AxiosError;

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

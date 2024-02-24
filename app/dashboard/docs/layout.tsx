import { COOKIE_NAME, minLevelSeeAllDocs } from "@/constants";
import prisma from "@/prisma/client";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getUserData();
  if (!currentUser || !currentUser.Profile) {
    redirect("/dashboard/");
  }
  if (currentUser.Profile.role.roleLevel < minLevelSeeAllDocs) {
    redirect("/dashboard/");
  }
  return <>{children}</>;
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

async function getUserData(): Promise<UserType> {
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

import { COOKIE_NAME, minLevelAddMemberCompany } from "@/constants";
import prisma from "@/prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    usernick,
    role,
  }: { name: string; usernick: [string]; role: string } = body;
  if (!name || !usernick || !role) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    const response = verify(value, secret);
    if (typeof response === "object" && response !== null) {
      if (response.data.roleLevel < minLevelAddMemberCompany) {
        return NextResponse.json(
          {
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const userExists = await prisma.user.findMany({
      where: {
        nick: {
          in: usernick,
        },
      },
      select: {
        id: true,
      },
    });
    if (!userExists) {
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 400,
        }
      );
    }
    const userIds = userExists.map((user) => user.id);
    const userJustMember = await prisma.companyRole.findMany({
      select: {
        profiles: {
          select: {
            user: {
              select: {
                nick: true,
              },
            },
          },
        },
      },
      where: {
        profiles: {
          some: {
            id: {
              in: userIds,
            },
          },
        },
        company: {
          name: name,
        },
        role: role,
      },
    });
    const nicksExistentes = userJustMember.flatMap((role) =>
      role.profiles.map((profile) => profile.user.nick)
    );
    const remainingNicks = usernick.filter(
      (nick) => !nicksExistentes.includes(nick)
    );
    console.log(remainingNicks);
    const companyRoleCorreto = await prisma.companyRole.findFirst({
      select: {
        id: true,
      },
      where: {
        role: role,
        company: {
          name: name,
        },
      },
    });
    if (!companyRoleCorreto) {
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 400,
        }
      );
    }
    const users = await prisma.user.findMany({
      where: {
        nick: {
          in: remainingNicks,
        },
      },
      select: {
        id: true,
      },
    });
    if (users.length <= 0) {
      return NextResponse.json(
        {
          message: "Ja existente",
        },
        {
          status: 202,
        }
      );
    }
    const res = await prisma.companyRole.update({
      where: {
        id: companyRoleCorreto.id,
      },
      data: {
        profiles: {
          connect: userIds.map((id) => ({ id })),
        },
      },
    });
    console.log(res);
    return NextResponse.json(
      {
        message: "Ok",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

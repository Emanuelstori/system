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
  }: { name: string; usernick: string; role: string } = body;
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
    const userExists = await prisma.user.findFirst({
      where: {
        nick: usernick,
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
    const userJustMember = await prisma.companyRole.findFirst({
      where: {
        profiles: {
          some: {
            id: userExists.id,
          },
        },
      },
    });
    if (userJustMember) {
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 400,
        }
      );
    }
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
    const res = await prisma.companyRole.update({
      where: {
        id: companyRoleCorreto.id,
      },
      data: {
        profiles: {
          connect: {
            id: userExists.id,
          },
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

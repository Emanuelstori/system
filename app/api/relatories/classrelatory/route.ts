import { COOKIE_NAME } from "@/constants";
import HttpStatusCode from "@/utils/HttpStatusCode";
import prisma from "@/prisma/client";
import { RelatoryType } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    targetProfileIds,
    description,
    deptRole,
    accepted = false,
  }: {
    title: string;
    targetProfileIds: string[];
    description: string;
    deptRole: string;
    accepted?: boolean;
  } = body;
  if (!targetProfileIds || !description || !title) {
    return NextResponse.json(
      {
        message: "Missing Fields",
      },
      {
        status: HttpStatusCode.BAD_REQUEST,
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
        status: HttpStatusCode.UNAUTHORIZED,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";
  var payload: any;
  try {
    payload = verify(value, secret);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }
  try {
    const permissionUser = await prisma.user.findFirst({
      where: {
        id: payload.data.id,
      },
      select: {
        id: true,
        Profile: {
          select: {
            role: {
              select: {
                roleLevel: true,
              },
            },
          },
        },
      },
    });
    if (
      !permissionUser?.Profile?.role.roleLevel ||
      permissionUser?.Profile?.role.roleLevel < 6
    ) {
      return NextResponse.json(
        {
          message: "Usuário sem permissão.",
        },
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    //console.log(permissionUser.id);

    const getCompany = await prisma.companyRole.findFirst({
      where: {
        role: deptRole,
      },
      select: {
        id: true,
      },
    });

    if (!getCompany) {
      return NextResponse.json(
        {
          message: "Role não existente.",
        },
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    const relatory = await prisma.relatoryClasses.create({
      data: {
        title: title,
        author: {
          connect: { id: permissionUser.id },
        },
        accepted: accepted,
        description: description,
        targets: {
          connect: targetProfileIds.map((id) => ({ id })),
        },
        company: {
          connect: {
            id: getCompany.id,
          },
        },
      },
    });
    if (!relatory) {
      return NextResponse.json(
        {
          message: "Erro ao criar relatório.",
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }
    const response = {
      message: "Created",
    };
    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.CREATED,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        message: "internal Server Error",
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

import { COOKIE_NAME } from "@/constants";
import HttpStatusCode from "@/utils/HttpStatusCode";
import prisma from "@/prisma/client";
import { RelatoryType } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    relatoryType,
    title,
    targetProfileIds,
    description,
  }: {
    relatoryType: RelatoryType;
    title: string;
    targetProfileIds: string[];
    description: string;
  } = body;
  
  if (!relatoryType || !targetProfileIds || !description || !title) {
    return new Response(
      JSON.stringify({
        message: "Missing Fields",
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME);

  if (!token) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: HttpStatusCode.UNAUTHORIZED,
      }
    );
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";
  var payload: any;

  try {
    payload = verify(value, secret);
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
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
      return new Response(
        JSON.stringify({
          message: "Usuário sem permissão.",
        }),
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    targetProfileIds.map((id) => console.log(id));

    const relatory = await prisma.relatory.create({
      data: {
        title: title,
        relatoryType: relatoryType,
        author: {
          connect: { id: permissionUser.id },
        },
        accepted: true,
        description: description,
        targets: {
          connect: targetProfileIds.map((id) => ({ id })),
        },
      },
    });

    if (!relatory) {
      return new Response(
        JSON.stringify({
          message: "Erro ao criar relatório.",
        }),
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

    return new Response(
      JSON.stringify({
        message: "internal Server Error",
      }),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

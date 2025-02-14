import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import { COOKIE_NAME, minLevelCreateUser } from "@/constants";
import { verify } from "jsonwebtoken";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { v4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, TAG, patente } = body;
  if (!username || !TAG || !patente) {
    return new Response(
      JSON.stringify({
        message: "Missing Fields",
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }
  try {
    const exists = await fetch(
      `https://www.habbo.com.br/api/public/users?name=${username}`
    );
    const test = await exists.json();
    if (!exists || test.error) {
      console.log(exists);
      console.log(test);
      return new Response(
        JSON.stringify({
          message: "Not Found",
        }),
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        message: e.message,
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }
  try {
    const cookieStore = cookies();

    const token = (await cookieStore).get(COOKIE_NAME);

    if (!token) {
      console.log("Sem TOKEN");
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
      console.log("ERRO VERIFY");
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }
    const permissionUser = await prisma.user.findFirst({
      where: {
        id: payload.data.id,
      },
      select: {
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
      !(permissionUser?.Profile?.role.roleLevel >= minLevelCreateUser)
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
    const verifyExists = await prisma.user.findFirst({
      where: {
        nick: username,
      },
    });
    if (verifyExists) {
      return new Response(
        JSON.stringify({
          message: "Usuário já existente.",
        }),
        {
          status: HttpStatusCode.FOUND,
        }
      );
    }
    const userident =
      "[" + process.env.NEXT_PUBLIC_POLICE_NAME + "] Soldado [" + TAG + "]";
    const user = await prisma.user.create({
      data: {
        id: v4(),
        nick: username,
        Profile: {
          create: {
            tag: TAG,
            salary: 1,
            warnings: 0,
            identity: userident,
            role: {
              connect: {
                roleLevel: parseInt(patente),
              },
            },
          },
        },
      },
      include: {
        Profile: true,
      },
    });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Precondition Failed",
        }),
        {
          status: 412,
        }
      );
    }
    const response = {
      id: user.id,
      nick: user.nick,
      message: "Created",
    };
    return new Response(JSON.stringify(response), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        message: "Erro Grave",
      }),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, minLevelCreateAgent } from "@/constants";
import { verify } from "jsonwebtoken";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { v4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, TAG } = body;
  if (!username || !TAG) {
    return NextResponse.json(
      {
        message: "Missing Fields",
      },
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
      return NextResponse.json(
        {
          message: "Not Found",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }
  try {
    const cookieStore = cookies();

    const token = cookieStore.get(COOKIE_NAME);

    if (!token) {
      console.log("Sem TOKEN");
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

    const secret = process.env.JWT_SECRET || "";
    var payload: any;
    try {
      payload = verify(value, secret);
    } catch (e) {
      console.log("ERRO VERIFY");
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }
    const permissionUser = await prisma.companyRole.findFirst({
      where: {
        company: {
          name: "DpE",
        },
        profiles: {
          some: {
            id: payload.data.id,
          },
        },
      },
      select: {
        roleLevel: true,
      },
    });
    if (!permissionUser) {
      return NextResponse.json(
        {
          message: "Usuário sem permissão.",
        },
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    if (
      !permissionUser?.roleLevel ||
      !(permissionUser?.roleLevel >= minLevelCreateAgent)
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
    const verifyExists = await prisma.user.findFirst({
      where: {
        nick: username,
      },
    });
    if (verifyExists) {
      return NextResponse.json(
        {
          message: "Usuário já existente.",
        },
        {
          status: HttpStatusCode.FOUND,
        }
      );
    }
    const userident =
      "[" + process.env.NEXT_PUBLIC_POLICE_NAME + "] Agente [" + TAG + "]";
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
                role: "Agente",
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
      return NextResponse.json(
        {
          message: "Precondition Failed",
        },
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
    return NextResponse.json(
      {
        message: "Erro Grave",
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

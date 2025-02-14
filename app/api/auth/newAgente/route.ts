import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import { COOKIE_NAME, minLevelCreateAgent } from "@/constants";
import { verify } from "jsonwebtoken";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { v4 } from "uuid";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, TAG, approved, description } = body;
  if (!username || !TAG || !approved || !description) {
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
      return new Response(
        JSON.stringify({
          message: "Usuário sem permissão.",
        }),
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    if (
      !permissionUser?.roleLevel ||
      !(permissionUser?.roleLevel >= minLevelCreateAgent)
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
      return new Response(
        JSON.stringify({
          message: "Precondition Failed",
        }),
        {
          status: 412,
        }
      );
    }
    const relatory = await prisma.relatory.create({
      data: {
        title: `${user.nick} ainda não se cadastrou :(`,
        relatoryType: "USER_ACCESS",
        author: {
          connect: { id: payload.data.id },
        },
        accepted: true,
        description: "Ainda não se cadastrou em nosso system.",
        targets: {
          connect: { id: user.id },
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
    var relatoryClass;
    if (approved) {
      relatoryClass = await prisma.relatory.create({
        data: {
          title: `Aprovado CFA: Curso de Formação de Agentes`,
          relatoryType: "CLASS_APPLICATION",
          author: {
            connect: { id: payload.data.id },
          },
          accepted: true,
          description: description,
          targets: {
            connect: { id: user.id },
          },
        },
      });
    } else {
      relatoryClass = await prisma.relatory.create({
        data: {
          title: `Reprovado CFA: Curso de Formação de Agentes`,
          relatoryType: "CLASS_APPLICATION",
          author: {
            connect: { id: payload.data.id },
          },
          accepted: false,
          description: description,
          targets: {
            connect: { id: user.id },
          },
        },
      });
    }
    if (!relatoryClass) {
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

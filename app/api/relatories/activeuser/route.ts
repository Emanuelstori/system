import { COOKIE_NAME, minLevelActivateUser } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { nickname }: { nickname: string } = body;

  if (!nickname) {
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
    if (
      !payload.data.roleLevel ||
      !(payload.data.roleLevel <= minLevelActivateUser)
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

    const relatoryToUpdate = await prisma.relatory.findFirst({
      select: {
        id: true,
      },
      where: {
        AND: [
          {
            targets: {
              some: {
                user: {
                  nick: nickname,
                },
              },
            },
            relatoryType: "USER_ACCESS",
          },
        ],
      },
    });

    if (!relatoryToUpdate) {
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const relatory = await prisma.relatory.update({
      data: {
        accepted: true,
        acceptedAt: new Date(),
      },
      where: {
        id: relatoryToUpdate.id,
      },
    });

    if (!relatory) {
      return new Response(
        JSON.stringify({
          message: "Erro ao atualizar relatório.",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const response = {
      message: "Updated",
    };

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.CREATED,
    });
  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

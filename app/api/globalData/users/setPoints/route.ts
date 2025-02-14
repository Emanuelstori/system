import { COOKIE_NAME, minLevelEditUser } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.qtdPoints || !body.action || !body.profileId) {
    return new Response(
      JSON.stringify({
        message: "Missing Fields",
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  } else if (body.action !== "Adicionar" && body.action !== "Remover" && body.action !== "Setar") {
    return new Response(
      JSON.stringify({
        message: "Invalid Action",
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
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  try {
    const userData: string | JwtPayload = verify(value, secret);

    if (!userData || typeof userData === "string") {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const profileInfo = await prisma.profile.findFirst({
      where: {
        id: body.profileId,
      },
      select: {
        points: true,
        role: {
          select: {
            roleLevel: true,
          },
        },
      },
    });

    if (!profileInfo || typeof profileInfo === "string") {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    } else if (profileInfo.role.roleLevel < minLevelEditUser) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    if (body.qtdPoints < 0) {
      return new Response(
        JSON.stringify({
          message: "Insufficient Points",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    if (body.action === "Adicionar") {
      await prisma.profile.update({
        where: {
          id: body.profileId,
        },
        data: {
          points: {
            increment: body.qtdPoints,
          },
        },
      });
    } else if (body.action === "Remover") {
      if (profileInfo.points < body.qtdPoints) {
        return new Response(
          JSON.stringify({
            message: "Funcionário não possui essa quantidade de pontos",
          }),
          {
            status: 403,
          }
        );
      }

      await prisma.profile.update({
        where: {
          id: body.profileId,
        },
        data: {
          points: {
            decrement: body.qtdPoints,
          },
        },
      });
    } else if (body.action === "Setar") {
      await prisma.profile.update({
        where: {
          id: body.profileId,
        },
        data: {
          points: body.qtdPoints,
        },
      });
    }

    return new Response(JSON.stringify("Created"), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 500,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

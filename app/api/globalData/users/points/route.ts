import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { format } from "date-fns";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME);

  console.log("token:" + token);

  if (!token) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
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

    const dailyPoints = await prisma.relatory.findFirst({
      where: {
        author: {
          id: userData.data.id,
        },
        relatoryType: "GET_DAILY_PRESENCE",
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const today = new Date();
    if (
      dailyPoints &&
      format(dailyPoints.createdAt, "dd/MM/yy") === format(today, "dd/MM/yy")
    ) {
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const queisso = await prisma.profile.update({
      where: {
        id: userData.data.id.toString(),
      },
      data: {
        points: { increment: 1 },
      },
    });

    try {
      const res = await prisma.relatory.create({
        data: {
          author: {
            connect: {
              id: userData.data.id,
            },
          },
          targets: {
            connect: {
              id: userData.data.id,
            },
          },
          relatoryType: "GET_DAILY_PRESENCE",
          accepted: true,
          title: "Get daily presence",
          description: "Get daily presence",
        },
      });
    } catch (e) {
      console.log(e);
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

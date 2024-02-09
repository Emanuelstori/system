import HttpStatusCode from "@/utils/HttpStatusCode";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        Profile: {
          role: {
            roleLevel: "desc",
          },
        },
      },
      select: {
        nick: true,
        active: true,
        Profile: {
          select: {
            role: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
    if (!users) {
      return NextResponse.json(
        {
          message: "Error",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }
    return new Response(JSON.stringify(users), {
      status: HttpStatusCode.OK,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

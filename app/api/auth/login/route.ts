import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import HttpStatusCode from "@/utils/HttpStatusCode";

const MAX_AGE = 21600; // 6 horas;


export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (!username || !password) {
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
    const userData = await prisma.user.findUnique({
      where: {
        nick: username,
      },
      select: {
        id: true,
        active: true,
        password: true,
        Profile: {
          select: {
            role: {
              select: {
                role: true,
                roleLevel: true,
              },
            },
          },
        },
      },
    });
    if (!userData) {
      return NextResponse.json(
        {
          message: "Not Found",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }
    if (userData.active === false || !userData.password) {
      return NextResponse.json(
        {
          message: "Inactive Account",
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    if (!(await bcrypt.compare(password, userData.password))) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    // Always check this
    const secret = process.env.JWT_SECRET || "";

    const data = {
      id: userData.id,
      username: username,
      active: userData.active,
      roleLevel: userData.Profile?.role?.roleLevel,
      role: userData.Profile?.role?.role,
    };

    const token = sign(
      {
        data,
      },
      secret,
      {
        expiresIn: MAX_AGE,
      }
    );

    const seralized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    const response = {
      message: "Authenticated",
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": seralized },
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

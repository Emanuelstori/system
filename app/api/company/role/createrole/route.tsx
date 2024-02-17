import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    company,
    roleLevel,
  }: { name: string; company: string; roleLevel: number } = body;
  if (!name || !company || !roleLevel) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
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
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    const response = verify(value, secret);
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const companyRoleExists = await prisma.companyRole.findFirst({
      where: {
        role: name,
        company: {
          name: company,
        },
      },
    });
    if (companyRoleExists) {
      return NextResponse.json(
        {
          message: "Something went wrong",
        },
        {
          status: 400,
        }
      );
    }
    const res = await prisma.companyRole.create({
      data: {
        role: name,
        roleLevel: roleLevel,
        company: {
          connect: {
            name: company,
          },
        },
      },
    });
    return NextResponse.json(
      {
        message: "Ok",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

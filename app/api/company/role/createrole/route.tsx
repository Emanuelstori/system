import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    company,
    roleLevel,
  }: { name: string; company: string; roleLevel: number } = body;
  
  if (!name || !company || !roleLevel) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 400,
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
        status: 401,
      }
    );
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  try {
    const response = verify(value, secret);
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
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
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
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

    return new Response(
      JSON.stringify({
        message: "Ok",
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 400,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

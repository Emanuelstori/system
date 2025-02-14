import { COOKIE_NAME, minLevelCreateClass } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    content,
    role,
    description,
  }: { title: string; content: string; role: string; description: string } = body;

  if (!content || !title || !role || !description) {
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
    console.log("caiu aqui");
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
      !(payload.data.roleLevel <= minLevelCreateClass)
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

    const roleId = await prisma.companyRole.findFirst({
      select: {
        id: true,
      },
      where: {
        role: role,
      },
    });

    if (!roleId) {
      return new Response(
        JSON.stringify({
          message: "Usuário sem permissão.",
        }),
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }

    const newClass = await prisma.classes.create({
      data: {
        title: title,
        content: content,
        description: description,
        applicatorRole: {
          connect: {
            id: roleId.id,
          },
        },
        author: {
          connect: {
            id: payload.data.id,
          },
        },
      },
    });

    if (!newClass) {
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
      message: "Created",
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

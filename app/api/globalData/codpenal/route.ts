import { COOKIE_NAME, minLevelEditCodpenal } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { content }: { content: string } = body;

  if (!content) {
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
      !(payload.data.roleLevel <= minLevelEditCodpenal)
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

    const codpenal = await prisma.documents.create({
      data: {
        title: "Código Penal",
        content: content,
        description: "Código Penal RHC",
        author: {
          connect: { id: payload.data.id },
        },
      },
    });

    if (!codpenal) {
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

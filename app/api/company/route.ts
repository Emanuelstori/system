import { COOKIE_NAME, minLevelCreateCompany } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description }: { name: string; description: string } = body;
  
  if (!name || !description) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
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

  if (payload.data.roleLevel < minLevelCreateCompany) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: HttpStatusCode.UNAUTHORIZED,
      }
    );
  }

  try {
    const company = await prisma.company.create({
      data: {
        name: name,
        description: description,
      },
    });

    if (!company) {
      return new Response(
        JSON.stringify({
          message: "Something went wrong",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Company created",
      }),
      {
        status: HttpStatusCode.CREATED,
      }
    );
  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

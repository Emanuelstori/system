import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();

  const { id } = body;

  if (!id) {
    return new Response(
      JSON.stringify({
        message: "Not Found",
      }),
      {
        status: 404,
      }
    );
  }

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
    verify(value, secret);
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

  const count = await prisma.notifications.count({
    where: {
      targets: {
        some: {
          id: id,
        },
      },
    },
  });

  const notifications = await prisma.notifications.findMany({
    where: {
      targets: {
        some: {
          id: id,
        },
      },
    },
  });

  if (!notifications) {
    return new Response(
      JSON.stringify({
        message: "Not Found",
      }),
      {
        status: 404,
      }
    );
  }

  const response = {
    notifications,
    count,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}

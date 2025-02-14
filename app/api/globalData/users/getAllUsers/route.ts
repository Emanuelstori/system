import HttpStatusCode from "@/utils/HttpStatusCode";
import prisma from "@/prisma/client";

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
      return new Response(
        JSON.stringify({
          message: "Error",
        }),
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

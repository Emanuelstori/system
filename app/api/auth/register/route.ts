import { NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      {
        message: "Missing Fields",
      },
      {
        status: 400,
      }
    );
  }
  const { data } = await axios.get(
    `https://www.habbo.com.br/api/public/users?name=${username}`
  );
  if (!data) {
    return NextResponse.json(
      {
        message: "Bad Gateway",
      },
      {
        status: 502,
      }
    );
  }
  if (data.motto != `system${process.env.NEXT_PUBLIC_POLICE_NAME}`) {
    return NextResponse.json(
      {
        message: "Precondition Failed",
      },
      {
        status: 412,
      }
    );
  }
  const hashedPass = await bcrypt.hash(password, 10);

  try {
    const verifyExists = await prisma.user.findFirst({
      where: {
        nick: username,
      },
    });

    if (!verifyExists || verifyExists.active) {
      return NextResponse.json(
        {
          message: "Precondition Failed",
        },
        {
          status: 412,
        }
      );
    }

    const canActivate = await prisma.relatory.findFirst({
      where: {
        relatoryType: "USER_ACCESS",
        targets: {
          some: {
            id: verifyExists.id,
          },
        },
      },
      select: {
        accepted: true,
      },
    });
    if (!canActivate || !canActivate.accepted) {
      console.log(canActivate);
      return NextResponse.json(
        {
          message: "Precondition Failed",
        },
        {
          status: 412,
        }
      );
    }

    const user = await prisma.user.update({
      where: {
        nick: username,
      },
      data: {
        password: hashedPass,
        active: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Precondition Failed",
        },
        {
          status: 412,
        }
      );
    }

    const relatoryUpdate = await prisma.relatory.updateMany({
      where: {
        relatoryType: "USER_ACCESS",
        targets: {
          some: {
            id: verifyExists.id,
          },
        },
      },
      data: {
        title: `${verifyExists.nick} Se cadastrou no system!`,
        description: `Foi nessa data especial que ${verifyExists.nick} se cadastrou em nosso system!`,
      },
    });
//Foi nessa data especial que DEPOSIT0 se cadastrou em nosso system!
    if (!relatoryUpdate) {
      return NextResponse.json(
        {
          message: "Precondition Failed",
        },
        {
          status: 412,
        }
      );
    }

    const response = {
      message: "Created",
    };
    return new Response(JSON.stringify(response), {
      status: 201,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Erro Grave",
      },
      {
        status: 500,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

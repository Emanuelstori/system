import { COOKIE_NAME, minLevelEditUser } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    if (!body.qtdPoints || !body.action || !body.profileId) {
        return NextResponse.json(
            {
                message: "Missing Fields",
            },
            {
                status: HttpStatusCode.BAD_REQUEST,
            }
        );
    } else if (body.action !== "Adicionar" && body.action !== "Remover" && body.action !== "Setar") {
        return NextResponse.json(
            {
                message: "Invalid Action",
            },
            {
                status: HttpStatusCode.BAD_REQUEST,
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
                status: HttpStatusCode.BAD_REQUEST,
            }
        );
    }

    const { value } = token;

    // Always check this
    const secret = process.env.JWT_SECRET || "";

    try {
        const userData: string | JwtPayload = verify(value, secret);

        if (!userData || typeof userData === "string") {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: HttpStatusCode.UNAUTHORIZED,
                }
            );
        }

        const profileInfo = await prisma.profile.findFirst({
            where: {
                id: body.profileId
            },
            select: {
                points: true,
                role: {
                    select: {
                        roleLevel: true
                    }
                }
            }
        })

        if (!profileInfo || typeof profileInfo === "string") {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: HttpStatusCode.BAD_REQUEST,
                }
            );
        }
        else if (profileInfo.role.roleLevel < minLevelEditUser) {
            return NextResponse.json(
                {
                    message: "Unauthorized",
                },
                {
                    status: HttpStatusCode.BAD_REQUEST,
                }
            );
        }
        if (body.qtdPoints < 0) {
            return NextResponse.json(
                {
                    message: "Insufficient Points",
                },
                {
                    status: HttpStatusCode.BAD_REQUEST,
                }
            );
        }

        if (body.action === "Adicionar") {
            await prisma.profile.update({
                where: {
                    id: body.profileId
                },
                data: {
                    points: {
                        increment: body.qtdPoints
                    }
                }
            })
        } else if (body.action === "Remover") {
            if (profileInfo.points < body.qtdPoints) {
                return NextResponse.json(
                    {
                        message: "Funcionário não possui essa quantidade de pontos",
                    },
                    {
                        status: 403,
                    }
                );
            }

            await prisma.profile.update({
                where: {
                    id: body.profileId
                },
                data: {
                    points: {
                        decrement: body.qtdPoints
                    }
                }
            })
        } else if (body.action === "Setar") {
            await prisma.profile.update({
                where: {
                    id: body.profileId
                },
                data: {
                    points: body.qtdPoints
                }
            })
        }


        return new Response(JSON.stringify("Created"), {
            status: 200,
        });
    } catch (e) {
        return NextResponse.json(
            {
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    } finally {
        prisma.$disconnect();
    }


}

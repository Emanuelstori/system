import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { format } from "date-fns";
import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    console.log("token:" + token);

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

        const dailyPoints = await prisma.relatory.findFirst({
            where: {
                author: {
                    id: userData.data.id,
                },
                relatoryType: "GET_DAILY_PRESENCE"
            },
            select: {
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const today = new Date().toString();
        if (dailyPoints && format(dailyPoints?.createdAt.toString(), "dd/MM/yy") === format(today, "dd/MM/yy")) {
            return NextResponse.json(
                {
                    message: "Something went wrong",
                },
                {
                    status: HttpStatusCode.BAD_REQUEST,
                }
            );
        }

        await prisma.profile.update({
            where: {
                id: userData.data.id.toString(),
            },
            data: {
                points: { increment: 1 }
            }
        })

        await prisma.relatory.create({
            data: {
                author: {
                    connect: {
                        id: userData.data.id
                    }
                },
                relatoryType: "GET_DAILY_PRESENCE",
                accepted: true,
                title: "Get daily presence",
                description: "Get daily presence",
            }
        })

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

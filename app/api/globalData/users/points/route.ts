import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
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
            return;
        }

        await prisma.profile.update({
            where: {
                id: userData.data.id.toString(),
            },
            data: {
                points: { increment: 1 }
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
                status: 400,
            }
        );
    } finally {
        prisma.$disconnect();
    }


}

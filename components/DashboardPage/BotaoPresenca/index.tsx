"use server";

import prisma from "@/prisma/client";
import Botao from "./Botao";
import { cookies, headers } from "next/headers";
import { COOKIE_NAME } from "@/constants";
import axios from "axios";
import { insertPoint } from "./action";
import { format } from "date-fns";

export default async function BotaoPresenca() {
    const pointsCatched: boolean = await dailyPointCatched();
    return (
        <form action={insertPoint}>
            <Botao disabled={pointsCatched} />
        </form>
    )

}

async function dailyPointCatched(): Promise<boolean> {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME);

    const headersList = headers();
    const domain = headersList.get("host");

    if (!token) {
        return false;
    }

    const createdUser = await axios.get(
        `http://${domain}/api/auth/me`,
        {
            headers: {
                Cookie: `${COOKIE_NAME}=${token.value}`,
            },
        }
    );

    const dailyPoints = await prisma.relatory.findFirst({
        where: {
            author: {
                id: createdUser?.data?.payload?.data.id,
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
        return true;
    }
    return false;
}
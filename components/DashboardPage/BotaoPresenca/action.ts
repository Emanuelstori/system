"use server";

import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import axios from "axios";
import { cookies, headers } from "next/headers";

export async function insertPoint(formData: FormData) {
    "use server";
    try {

        const cookieStore = cookies();
        const token = cookieStore.get(COOKIE_NAME);
        
        const headersList = headers();
        const domain = headersList.get("host");

        if (!token) {
            return;
        }

        const createdUser = await axios.post(
            `http://${domain}/api/globalData/users/points`,
            {},
            {
                headers: {
                    Cookie: `${COOKIE_NAME}=${token.value}`,
                },
            }
        );
    } catch (e) {

    } finally {
        prisma.$disconnect();
    }
}
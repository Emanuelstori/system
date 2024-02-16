"use server";

import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { ToastContainer, toast } from "react-toastify";

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
        revalidatePath('/dashboard', 'page');
    } catch (e) {

    } finally {
        prisma.$disconnect();
    }
}
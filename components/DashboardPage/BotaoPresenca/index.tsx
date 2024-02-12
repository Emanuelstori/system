"use server";

import prisma from "@/prisma/client";
import Botao from "./Botao";
import { cookies, headers } from "next/headers";
import { COOKIE_NAME } from "@/constants";
import axios from "axios";
import { insertPoint } from "./action";

export default async function BotaoPresenca() {
    return (
        <form action={insertPoint}>
            <Botao />
        </form>
    )

}
"use server";

import { cookies } from "next/headers";
export default async function DeleteCookie(cookieName: string) {
  cookies().delete(cookieName);
}

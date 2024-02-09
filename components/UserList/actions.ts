"use server";
import { revalidatePath } from "next/cache";
import { COOKIE_NAME } from "@/constants";
import axios from "axios";
import { cookies, headers } from "next/headers";

export async function createUser(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return;
  }
  const rawFormData = {
    username: formData.get("username"),
    TAG: formData.get("tag"),
    patente: formData.get("patente")
  };
  try {
    const createdUser = await axios.post(
      "http://localhost:3000/api/auth/newUser",
      rawFormData,
      {
        headers: {
          Cookie: `${COOKIE_NAME}=${token.value}`,
        },
      }
    );
    const relatoryFormData = {
      title: "ainda não se cadastrou :(",
      relatoryType: "USER_ACCESS",
      targetProfileIds: [createdUser.data.id],
      description: "ainda não se cadastrou em nosso system.",
    };
    const relatory = await axios.post(
      "http://localhost:3000/api/relatories",
      relatoryFormData,
      {
        headers: {
          Cookie: `${COOKIE_NAME}=${token.value}`,
        },
      }
    );
    revalidatePath("/dashboard/listagem", "page");
  } catch (err) {
    console.log("Erro");
  }
}

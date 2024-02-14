"use server";
import { revalidatePath } from "next/cache";
import { COOKIE_NAME } from "@/constants";
import axios from "axios";
import { cookies, headers } from "next/headers";

export async function createUser(formData: FormData) {
  const headersList = headers();
  const domain = headersList.get("host");
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return;
  }
  const rawFormData = {
    username: formData.get("username"),
    TAG: formData.get("tag"),
    patente: formData.get("patente"),
  };
  try {
    const createdUser = await axios.post(
      `http://${domain}/api/auth/newUser`,
      rawFormData,
      {
        headers: {
          Cookie: `${COOKIE_NAME}=${token.value}`,
        },
      }
    );
    if (!createdUser) {
      return false;
    }
    console.log(createdUser);
    const relatoryFormData = {
      title: `${createdUser.data.nick} ainda não se cadastrou :(`,
      relatoryType: "USER_ACCESS",
      targetProfileIds: [createdUser.data.id],
      description: "Ainda não se cadastrou em nosso system.",
    };
    const relatory = await axios.post(
      `http://${domain}/api/relatories`,
      relatoryFormData,
      {
        headers: {
          Cookie: `${COOKIE_NAME}=${token.value}`,
        },
      }
    );
    revalidatePath("/dashboard/listagem", "page");
  } catch (err) {
    console.log(err);
    console.log("Erro");
  }
}

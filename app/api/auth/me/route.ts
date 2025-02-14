import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  const token = (await cookieStore).get(COOKIE_NAME);

  if (!token) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }
  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    const payload = verify(value, secret);
    const response = {
      payload,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: 400,
      }
    );
  }
}

import { COOKIE_NAME, minLevelCreatePost } from "@/constants";
import prisma from "@/prisma/client";
import HttpStatusCode from "@/utils/HttpStatusCode";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    image,
    description,
    content,
  }: { title: string; image: string; description: string; content: string } = body;

  if (!title || !description || !content) {
    return new Response(
      JSON.stringify({
        message: "Missing Fields",
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME);

  if (!token) {
    console.log("caiu aqui");
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: HttpStatusCode.UNAUTHORIZED,
      }
    );
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";
  var payload: any;

  try {
    payload = verify(value, secret);
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Something went wrong",
      }),
      {
        status: HttpStatusCode.BAD_REQUEST,
      }
    );
  }

  try {
    if (
      !payload.data.roleLevel ||
      !(payload.data.roleLevel <= minLevelCreatePost)
    ) {
      return new Response(
        JSON.stringify({
          message: "Usuário sem permissão.",
        }),
        {
          status: HttpStatusCode.FORBIDDEN,
        }
      );
    }
    
    const postData: {
      title: string;
      image?: string;
      description: string;
      content: string;
      author: {
        connect: {
          id: string;
        };
      };
    } = {
      title: title,
      description: description,
      content: content,
      author: {
        connect: { id: payload.data.id },
      },
    };

    if (image) {
      postData.image = image;
    }

    const post = await prisma.post.create({
      data: postData,
    });

    if (!post) {
      return new Response(
        JSON.stringify({
          message: "Erro ao criar relatório.",
        }),
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    const response = {
      message: "Created",
    };

    return new Response(JSON.stringify(response), {
      status: HttpStatusCode.CREATED,
    });
  } catch (err) {
    console.log(err);

    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  } finally {
    prisma.$disconnect();
  }
}

/*
model Post {
  id          Int       @id @default(autoincrement())
  title       String
  image       String
  description String
  content     String
  likes       Int       @default(0)
  dislikes    Int       @default(0)
  author      Profile   @relation("PostAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  authorId    String
  watchedBy   Profile[] @relation("WatchedPosts")
  createdAt   DateTime  @default(now()) @db.Timestamp(6)
}
  */

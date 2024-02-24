"use server";

import Post from "@/components/DashboardPage/Post";
import { COOKIE_NAME } from "@/constants";
import prisma from "@/prisma/client";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function PageDocument({
  params,
}: {
  params: { post: string };
}) {
  const currentPost = await getPost({ post: decodeURIComponent(params.post) });
  if (params.post && currentPost) {
    userSeePost({ post: currentPost });
    return (
      <div>
        <Post post={currentPost} />
      </div>
    );
  } else {
    redirect("/dashboard");
  }
}

async function getPost({ post }: { post: string }): Promise<{
  id: number;
  image: string;
  title: string;
  description: string;
  content: string;
  likes: number;
  dislikes: number;
  authorId: string;
  createdAt: Date;
} | null> {
  try {
    if (!post) {
      return null;
    }
    const res = await prisma.post.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: post,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    prisma.$disconnect();
  }
}

type UserType = {
  id: string;
  nick: string;
  active: boolean;
  Profile: {
    role: {
      role: string;
      roleLevel: number;
    };
  } | null;
} | null;

async function userSeePost({
  post,
}: {
  post: {
    id: number;
    image: string;
    title: string;
    description: string;
    content: string;
    likes: number;
    dislikes: number;
    authorId: string;
    createdAt: Date;
  };
}) {
  const data = await getUserData();
  if (data) {
    try {
      const watched = await prisma.post.update({
        data: {
          watchedBy: {
            connect: {
              id: data.id,
            },
          },
        },
        where: {
          id: post.id,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      prisma.$disconnect();
    }
  }
}

async function getUserData(): Promise<UserType> {
  const headersList = headers();
  const domain = headersList.get("host");
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(`http://${domain}/api/auth/me`, {
      headers: {
        Cookie: `${COOKIE_NAME}=${token.value}`,
      },
    });
    const data = await res.json();
    if (data) {
      try {
        const userData = await prisma.user.findFirst({
          where: {
            id: data.payload.data.id,
          },
          select: {
            id: true,
            nick: true,
            active: true,
            Profile: {
              select: {
                role: {
                  select: {
                    role: true,
                    roleLevel: true,
                  },
                },
              },
            },
          },
        });
        return userData;
      } catch (err) {
        console.log(err);

        return null;
      } finally {
        prisma.$disconnect();
      }
    }
    return null;
  } catch (e) {
    console.log(e);

    return null;
  }
}

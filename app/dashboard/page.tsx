"use server";

import { COOKIE_NAME } from "@/constants";
import Destaques from "@/components/DashboardPage/Destaques/index";
import Alertas from "@/components/DashboardPage/Alertas";
import Avisos from "@/components/DashboardPage/Avisos";
import Ranking from "@/components/DashboardPage/Ranking";
import Posts from "@/components/DashboardPage/Posts";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import SearchBox from "@/components/DashboardPage/SearchBox/index";
import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import BotaoPresenca from "@/components/DashboardPage/BotaoPresenca";
import { ToastContainer } from "react-toastify";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { pagePosts: string | undefined };
}) {
  var currentPage = 0;
  if (searchParams?.pagePosts) {
    currentPage = parseInt(searchParams.pagePosts);
  }
  const userInfo = await getUserInfo();

  const userList = await getUsers();

  const posts = await getPosts({ page: currentPage });

  const maxPage = await getMaxPages();

  const advice = await getAdviceSquare();

  return (
    <div className="w-full max-w-screen h-full">
      <div className="rounded-lg w-full flex flex-col px-4 md:!px-16 pl-20 py-1">
        <div className="flex flex-wrap-reverse gap-y-4 w-full justify-between py-1 md:py-8 items-flex-start">
          <div className="flex flex-grow-1 md:pr-52 items-center justify-between max-sm:!py-4 gap-y-4 flex-wrap">
            <div className="flex flex-col">
              <div className="">
                <h1 className="text-xl font-bold">
                  Olá {userInfo?.data.username},
                </h1>
                <p className="text-xs text-opacity-25">
                  Bom te ver aqui denovo!
                </p>
              </div>
            </div>
            <SearchBox users={userList} />
          </div>
          <Alertas />
        </div>
        <div className="flex w-full justify-end mt-4">
          <BotaoPresenca />
        </div>
        <div className="flex w-full mt-4 justify-center md:justify-between h-fit items-start gap-16 flex-wrap-reverse md:!flex-nowrap">
          <Avisos advice={advice} />

          <Ranking users={userList} />
        </div>
        <div className="flex w-full mt-4 justify-center md:justify-between h-fit items-start gap-16 flex-wrap-reverse md:!flex-nowrap">
          <Posts posts={posts} maxPage={maxPage} />
          <Destaques />
        </div>
      </div>
      <div></div>
      <ToastContainer className="absolute" autoClose={5000} />
    </div>
  );
}

async function getUserInfo(): Promise<any> {
  const cookieStore = cookies();

  const token = cookieStore.get(COOKIE_NAME);

  if (!token) return;

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";

  const payload = verify(value, secret);

  const response = {
    payload,
  };
  return response.payload;
}

type User = {
  nick: string;
  Profile: {
    points: number;
  } | null;
};

async function getUsers(): Promise<User[] | null> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        Profile: {
          points: "desc",
        },
      },
      select: {
        nick: true,
        Profile: {
          select: {
            points: true,
          },
        },
      },
    });
    return users;
  } catch (e) {
    return null;
  } finally {
    prisma.$disconnect();
  }
}

async function getPosts({ page }: { page: number }): Promise<Post[]> {
  try {
    var pageNumber = page || 1;
    let skipValue;
    if (pageNumber > 1) {
      skipValue = pageNumber - 2 + 5;
    } else {
      skipValue = 0;
    }
    pageNumber < 1 && (pageNumber = 1);
    const posts = await prisma.post.findMany({
      skip: skipValue,
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (e) {
    return [];
  } finally {
    prisma.$disconnect();
  }
}

async function getMaxPages(): Promise<number> {
  try {
    const pages = await prisma.post.count();
    return pages;
  } catch (e) {
    return 0;
  } finally {
    prisma.$disconnect();
  }
}

async function getAdviceSquare() {
  try {
    const res = await prisma.advice.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res;
  } catch (e) {
    return null;
  } finally {
    prisma.$disconnect();
  }
}

"use server";

import List from "@/components/DashboardPage/Docs/List";
import prisma from "@/prisma/client";

export default async function DocsPage() {
  const documents = await getDocs();
  if (!documents)
    return (
      <>
        <div>Nenhum documento ainda</div>
      </>
    );
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center">Documentos</div>
      <List documents={documents} />
    </div>
  );
}

async function getDocs(): Promise<
  | {
      id: number;
      title: string;
      description: string;
      content: string;
      createdAt: Date;
      author: {
        user: {
          nick: string;
        };
      };
    }[]
  | undefined
> {
  try {
    const res = await prisma.documents.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        author: {
          select: {
            user: {
              select: {
                nick: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
    return undefined;
  } finally {
    prisma.$disconnect();
  }
}

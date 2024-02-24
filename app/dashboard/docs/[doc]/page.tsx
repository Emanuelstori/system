"use server";

import GeneralDocument from "@/components/DashboardPage/GeneralDocument";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function PageDocument({
  params,
}: {
  params: { doc: string };
}) {
  const currentDoc = await getDoc({ doc: params.doc });
  if (params.doc && currentDoc) {
    return (
      <div>
        <GeneralDocument doc={currentDoc} />
      </div>
    );
  } else {
    redirect("/dashboard");
  }
}

async function getDoc({ doc }: { doc: string }): Promise<{
  id: number;
  title: string;
  description: string;
  content: string;
  authorId: string;
  createdAt: Date;
} | null> {
  try {
    if (!doc) {
      return null;
    }
    const res = await prisma.documents.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        title: doc,
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

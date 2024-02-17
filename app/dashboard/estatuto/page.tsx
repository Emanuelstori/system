"use server";

import Estatuto from "@/components/DashboardPage/Estatuto";
import prisma from "@/prisma/client";

export default async function EstatutoPage() {
  const estatutoData = await getEstatuto();
  return (
    <div className="absolute w-full">
      <Estatuto estatuto={estatutoData} />
    </div>
  );
}

async function getEstatuto() {
  try {
    const res = await prisma.documents.findFirst({
      where: {
        title: "Estatuto",
      },
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

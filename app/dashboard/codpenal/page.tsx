"use server";

import Codpenal from "@/components/DashboardPage/Codpenal";
import prisma from "@/prisma/client";

export default async function CodpenalPage() {
  const CodpenalData = await getCodPenal();
  return (
    <div className="absolute w-full">
      <Codpenal codpenal={CodpenalData} />
    </div>
  );
}

async function getCodPenal() {
  try {
    const res = await prisma.documents.findFirst({
      where: {
        title: "Código Penal",
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

-- CreateTable
CREATE TABLE "RelatoryClasses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,
    "companyRoleId" INTEGER NOT NULL,

    CONSTRAINT "RelatoryClasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatoryClassTarget" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatoryClassTarget_AB_unique" ON "_RelatoryClassTarget"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatoryClassTarget_B_index" ON "_RelatoryClassTarget"("B");

-- AddForeignKey
ALTER TABLE "RelatoryClasses" ADD CONSTRAINT "RelatoryClasses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatoryClasses" ADD CONSTRAINT "RelatoryClasses_companyRoleId_fkey" FOREIGN KEY ("companyRoleId") REFERENCES "CompanyRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatoryClassTarget" ADD CONSTRAINT "_RelatoryClassTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatoryClassTarget" ADD CONSTRAINT "_RelatoryClassTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "RelatoryClasses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

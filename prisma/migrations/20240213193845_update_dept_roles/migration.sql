/*
  Warnings:

  - You are about to drop the column `companyId` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_companyId_fkey";

-- AlterTable
ALTER TABLE "CompanyRole" ALTER COLUMN "role" SET DEFAULT 'Membro';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "companyId";

-- CreateTable
CREATE TABLE "_CompanyRoleToProfile" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyRoleToProfile_AB_unique" ON "_CompanyRoleToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyRoleToProfile_B_index" ON "_CompanyRoleToProfile"("B");

-- AddForeignKey
ALTER TABLE "_CompanyRoleToProfile" ADD CONSTRAINT "_CompanyRoleToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "CompanyRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyRoleToProfile" ADD CONSTRAINT "_CompanyRoleToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

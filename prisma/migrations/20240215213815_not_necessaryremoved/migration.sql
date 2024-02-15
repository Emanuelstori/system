/*
  Warnings:

  - You are about to drop the column `idRel` on the `CompanyRole` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CompanyRole_idRel_key";

-- AlterTable
ALTER TABLE "CompanyRole" DROP COLUMN "idRel";

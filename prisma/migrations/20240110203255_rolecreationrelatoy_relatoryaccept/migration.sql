-- AlterEnum
ALTER TYPE "RelatoryType" ADD VALUE 'ROLE_CREATION';

-- AlterTable
ALTER TABLE "Relatory" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false;

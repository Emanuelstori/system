-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RelatoryType" ADD VALUE 'USER_CONTRACT';
ALTER TYPE "RelatoryType" ADD VALUE 'USER_RETIREE';
ALTER TYPE "RelatoryType" ADD VALUE 'USER_LICENSE';
ALTER TYPE "RelatoryType" ADD VALUE 'WARNING';
ALTER TYPE "RelatoryType" ADD VALUE 'ROLE_BUY';

/*
  Warnings:

  - Added the required column `title` to the `Relatory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relatory" ADD COLUMN     "title" TEXT NOT NULL;

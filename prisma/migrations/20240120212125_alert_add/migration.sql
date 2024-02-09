-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "likes" SET DEFAULT 0,
ALTER COLUMN "dislikes" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

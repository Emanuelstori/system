-- CreateTable
CREATE TABLE "Advice" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Advice" ADD CONSTRAINT "Advice_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

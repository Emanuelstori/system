-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "awardedId" INTEGER;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "dislikes" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Awarded" (
    "id" SERIAL NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Awarded_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WatchedPosts" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WatchedPosts_AB_unique" ON "_WatchedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_WatchedPosts_B_index" ON "_WatchedPosts"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_awardedId_fkey" FOREIGN KEY ("awardedId") REFERENCES "Awarded"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WatchedPosts" ADD CONSTRAINT "_WatchedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WatchedPosts" ADD CONSTRAINT "_WatchedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

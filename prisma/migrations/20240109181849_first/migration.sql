-- CreateEnum
CREATE TYPE "RelatoryType" AS ENUM ('USER_ACCESS', 'USER_REINTEGRATION', 'USER_PROMOTION', 'USER_RELEGATION', 'USER_DISCONNEXION', 'USER_TAG', 'USER_CHANGE_ACCOUNT', 'CLASS_APPLICATION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NORMAL', 'ALERT', 'DANGER', 'SUCCESS', 'ERROR');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "tag" VARCHAR(255),
    "salary" INTEGER NOT NULL DEFAULT 1,
    "warnings" INTEGER NOT NULL DEFAULT 0,
    "identity" VARCHAR(255) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "companyId" INTEGER,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nick" TEXT NOT NULL,
    "email" TEXT,
    "password" VARCHAR(255),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Soldado',
    "roleLevel" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRole" (
    "id" SERIAL NOT NULL,
    "idRel" INTEGER,
    "role" TEXT NOT NULL DEFAULT 'firstRole',
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relatory" (
    "id" INTEGER NOT NULL,
    "relatoryType" "RelatoryType" NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Relatory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatoryTarget" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NotificationTarget" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nick_key" ON "User"("nick");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_key" ON "Role"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleLevel_key" ON "Role"("roleLevel");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRole_idRel_key" ON "CompanyRole"("idRel");

-- CreateIndex
CREATE UNIQUE INDEX "_RelatoryTarget_AB_unique" ON "_RelatoryTarget"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatoryTarget_B_index" ON "_RelatoryTarget"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NotificationTarget_AB_unique" ON "_NotificationTarget"("A", "B");

-- CreateIndex
CREATE INDEX "_NotificationTarget_B_index" ON "_NotificationTarget"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRole" ADD CONSTRAINT "CompanyRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relatory" ADD CONSTRAINT "Relatory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatoryTarget" ADD CONSTRAINT "_RelatoryTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatoryTarget" ADD CONSTRAINT "_RelatoryTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "Relatory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationTarget" ADD CONSTRAINT "_NotificationTarget_A_fkey" FOREIGN KEY ("A") REFERENCES "Notifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationTarget" ADD CONSTRAINT "_NotificationTarget_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

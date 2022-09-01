/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'KAKAO', 'LOCAL');

-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('white', 'brown', 'green', 'yellow', 'pink', 'blue', 'orange', 'red', 'transparent', 'black', 'purple', 'gray');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Shape" AS ENUM ('rectangle', 'oval', 'circle', 'pentagon', 'square', 'triangle', 'rhombus', 'hexagon', 'etc');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "birth" VARCHAR(9),
ADD COLUMN     "createdAt" DATE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isDeleted" BOOLEAN DEFAULT false,
ADD COLUMN     "password" VARCHAR(100),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "profileImg" TEXT DEFAULT 'imageUrl',
ADD COLUMN     "provider" "Provider" DEFAULT 'LOCAL',
ADD COLUMN     "role" "Role" DEFAULT 'USER',
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "phone" VARCHAR(20),
    "address" TEXT,
    "monday" VARCHAR(50),
    "tuesday" VARCHAR(50),
    "wednesday" VARCHAR(50),
    "thursday" VARCHAR(50),
    "friday" VARCHAR(50),
    "saturday" VARCHAR(50),
    "sunday" VARCHAR(50),
    "holiday" VARCHAR(50),

    CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PharmacyBookMark" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "pharmacy_id" INTEGER,

    CONSTRAINT "PharmacyBookMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "content" VARCHAR(320) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pill" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(10),
    "name" VARCHAR(20),
    "shape" "Shape",
    "letters" VARCHAR(50),
    "colors" "Colors",

    CONSTRAINT "Pill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PillBookMark" (
    "id" TEXT NOT NULL,
    "pill_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "PillBookMark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL,
    "pillBookMark_id" TEXT,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pill_code_key" ON "Pill"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "PharmacyBookMark" ADD CONSTRAINT "PharmacyBookMark_pharmacy_id_fkey" FOREIGN KEY ("pharmacy_id") REFERENCES "Pharmacy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PharmacyBookMark" ADD CONSTRAINT "PharmacyBookMark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PillBookMark" ADD CONSTRAINT "PillBookMark_pill_id_fkey" FOREIGN KEY ("pill_id") REFERENCES "Pill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PillBookMark" ADD CONSTRAINT "PillBookMark_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_pillBookMark_id_fkey" FOREIGN KEY ("pillBookMark_id") REFERENCES "PillBookMark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

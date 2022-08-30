/*
  Warnings:

  - The primary key for the `Pill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Pill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `shape` column on the `Pill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `colors` column on the `Pill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mark` column on the `Pill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pill_id` column on the `PillBookMark` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PillBookMark" DROP CONSTRAINT "PillBookMark_pill_id_fkey";

-- AlterTable
ALTER TABLE "Pill" DROP CONSTRAINT "Pill_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
DROP COLUMN "shape",
ADD COLUMN     "shape" TEXT,
DROP COLUMN "colors",
ADD COLUMN     "colors" TEXT,
DROP COLUMN "mark",
ADD COLUMN     "mark" INTEGER,
ADD CONSTRAINT "Pill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PillBookMark" DROP COLUMN "pill_id",
ADD COLUMN     "pill_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Colors";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Shape";

-- AddForeignKey
ALTER TABLE "PillBookMark" ADD CONSTRAINT "PillBookMark_pill_id_fkey" FOREIGN KEY ("pill_id") REFERENCES "Pill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

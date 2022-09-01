/*
  Warnings:

  - You are about to drop the `Alarm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Pill` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mark` to the `Pill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alarm" DROP CONSTRAINT "Alarm_pillBookMark_id_fkey";

-- AlterTable
ALTER TABLE "Pill" ADD COLUMN     "mark" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "PillBookMark" ADD COLUMN     "alarm" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Alarm";

-- CreateIndex
CREATE UNIQUE INDEX "Pill_name_key" ON "Pill"("name");

/*
  Warnings:

  - A unique constraint covering the columns `[mobile]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "customId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_mobile_key" ON "public"."user"("mobile");

/*
  Warnings:

  - You are about to alter the column `total` on the `cartItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."cartItem" ALTER COLUMN "total" SET DATA TYPE INTEGER;

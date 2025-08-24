/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."history" DROP CONSTRAINT "history_inventoryId_fkey";

-- DropTable
DROP TABLE "public"."history";

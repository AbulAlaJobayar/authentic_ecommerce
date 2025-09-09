/*
  Warnings:

  - You are about to drop the column `profit` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `baseCost` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `profit` on the `orderItem` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "profit";

-- AlterTable
ALTER TABLE "public"."orderItem" DROP COLUMN "baseCost",
DROP COLUMN "profit",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

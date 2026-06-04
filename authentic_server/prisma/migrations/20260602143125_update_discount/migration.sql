/*
  Warnings:

  - You are about to drop the column `ProductIds` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `appliesTo` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `discount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "quantity" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "discount" DROP COLUMN "ProductIds",
DROP COLUMN "appliesTo",
DROP COLUMN "isDeleted",
ADD COLUMN     "productIds" TEXT[];

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "discountId" TEXT;

-- DropEnum
DROP TYPE "DiscountType";

-- CreateTable
CREATE TABLE "OrderDiscount" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "discountId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderDiscount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDiscount" ADD CONSTRAINT "OrderDiscount_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDiscount" ADD CONSTRAINT "OrderDiscount_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `baseCost` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `productBatch` table. All the data in the column will be lost.
  - You are about to drop the `inventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyingPrice` to the `productBatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryId` to the `productBatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rackCode` to the `productBatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shelfCode` to the `productBatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `productBatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."history" DROP CONSTRAINT "history_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."inventory" DROP CONSTRAINT "inventory_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."inventory" DROP CONSTRAINT "inventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."productBatch" DROP CONSTRAINT "productBatch_productId_fkey";

-- DropIndex
DROP INDEX "public"."product_inventoryId_key";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "baseCost",
DROP COLUMN "inventoryId",
DROP COLUMN "supplierId",
DROP COLUMN "warehouseId";

-- AlterTable
ALTER TABLE "public"."productBatch" DROP COLUMN "productId",
ADD COLUMN     "buyingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "inventoryId" TEXT NOT NULL,
ADD COLUMN     "rackCode" TEXT NOT NULL,
ADD COLUMN     "shelfCode" TEXT NOT NULL,
ADD COLUMN     "supplierId" TEXT,
ADD COLUMN     "warehouseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."inventory";

-- CreateTable
CREATE TABLE "public"."Inventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "alertQuantity" INTEGER NOT NULL DEFAULT 5,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "public"."Inventory"("productId");

-- AddForeignKey
ALTER TABLE "public"."productBatch" ADD CONSTRAINT "productBatch_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productBatch" ADD CONSTRAINT "productBatch_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."productBatch" ADD CONSTRAINT "productBatch_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."history" ADD CONSTRAINT "history_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

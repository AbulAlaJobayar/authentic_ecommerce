/*
  Warnings:

  - Added the required column `batchId` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orderItem_orderId_productId_idx";

-- AlterTable
ALTER TABLE "orderItem" ADD COLUMN     "batchId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "productBatch" ADD COLUMN     "remainingQuantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "stockMovement" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "type" "ActionType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stockMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stockMovement_inventoryId_batchId_type_idx" ON "stockMovement"("inventoryId", "batchId", "type");

-- CreateIndex
CREATE INDEX "orderItem_orderId_productId_batchId_idx" ON "orderItem"("orderId", "productId", "batchId");

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "productBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockMovement" ADD CONSTRAINT "stockMovement_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockMovement" ADD CONSTRAINT "stockMovement_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "productBatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

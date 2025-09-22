/*
  Warnings:

  - Added the required column `destination` to the `shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."shipment_orderId_idx";

-- AlterTable
ALTER TABLE "public"."shipment" ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "shipment_orderId_trackingNumber_carrier_destination_idx" ON "public"."shipment"("orderId", "trackingNumber", "carrier", "destination");

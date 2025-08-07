-- AlterTable
ALTER TABLE "public"."category" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."warehouse" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

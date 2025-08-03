-- CreateEnum
CREATE TYPE "public"."accountStatus" AS ENUM ('ACTIVE', 'IN_PROGRESS', 'SUSPEND', 'BLOCK');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "accountStatus" "public"."accountStatus" NOT NULL DEFAULT 'ACTIVE';

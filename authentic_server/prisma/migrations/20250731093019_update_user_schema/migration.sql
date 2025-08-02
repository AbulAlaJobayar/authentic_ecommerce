-- DropIndex
DROP INDEX "public"."user_email_name_mobile_role_idx";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "image" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "user_email_name_mobile_role_customId_idx" ON "public"."user"("email", "name", "mobile", "role", "customId");

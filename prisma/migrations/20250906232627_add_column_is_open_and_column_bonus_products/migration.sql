-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "bonusProducts" TEXT[];

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isOpen" BOOLEAN NOT NULL DEFAULT false;

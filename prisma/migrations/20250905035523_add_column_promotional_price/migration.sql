-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "endsAt" TIMESTAMP(3),
ADD COLUMN     "startsAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "promotionalPrice" DOUBLE PRECISION;

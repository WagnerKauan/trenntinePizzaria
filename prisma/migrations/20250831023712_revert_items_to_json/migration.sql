/*
  Warnings:

  - You are about to drop the column `orderId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `items` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_orderId_fkey";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "items" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "orderId";

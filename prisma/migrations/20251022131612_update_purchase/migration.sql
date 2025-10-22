/*
  Warnings:

  - Made the column `purchaseDate` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "purchaseDate" SET NOT NULL,
ALTER COLUMN "purchaseDate" DROP DEFAULT,
ALTER COLUMN "purchaseDate" SET DATA TYPE TEXT;

/*
  Warnings:

  - You are about to drop the column `itemId` on the `Purchase` table. All the data in the column will be lost.
  - The `purchaseDate` column on the `Purchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `name` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "itemId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
DROP COLUMN "purchaseDate",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

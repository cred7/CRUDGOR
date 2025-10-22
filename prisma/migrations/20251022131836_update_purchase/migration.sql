/*
  Warnings:

  - You are about to drop the column `name` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `productname` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "name",
ADD COLUMN     "productname" TEXT NOT NULL;

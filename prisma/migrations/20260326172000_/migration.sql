/*
  Warnings:

  - You are about to drop the column `revunue` on the `revenues` table. All the data in the column will be lost.
  - Added the required column `revenue` to the `revenues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "revenues" DROP COLUMN "revunue",
ADD COLUMN     "revenue" INTEGER NOT NULL;

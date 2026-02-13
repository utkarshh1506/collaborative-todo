/*
  Warnings:

  - You are about to drop the column `is_verified` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "is_verified",
DROP COLUMN "status";

-- DropEnum
DROP TYPE "CompanyStatus";

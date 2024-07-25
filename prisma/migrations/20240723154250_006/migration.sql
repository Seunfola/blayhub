/*
  Warnings:

  - Made the column `jobType` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `industry` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "jobType" SET NOT NULL;
ALTER TABLE "Job" ALTER COLUMN "jobType" DROP DEFAULT;
ALTER TABLE "Job" ALTER COLUMN "industry" SET NOT NULL;
ALTER TABLE "Job" ALTER COLUMN "industry" DROP DEFAULT;

/*
  Warnings:

  - Added the required column `industry` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN "jobType" STRING DEFAULT 'Full-time';
ALTER TABLE "Job" ADD COLUMN "industry" STRING DEFAULT 'General';


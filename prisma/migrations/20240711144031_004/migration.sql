/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterSequence
ALTER SEQUENCE "JobApplication_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Job_id_seq" MAXVALUE 9223372036854775807;

-- DropTable
DROP TABLE "Admin";

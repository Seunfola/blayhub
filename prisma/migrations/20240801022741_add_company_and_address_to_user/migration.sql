-- AlterSequence
ALTER SEQUENCE "Experience_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" STRING;
ALTER TABLE "User" ADD COLUMN     "company" STRING;

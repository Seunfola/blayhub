-- AlterTable
ALTER TABLE "User" ADD COLUMN     "resetToken" STRING;
ALTER TABLE "User" ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);

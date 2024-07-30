-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" STRING;
ALTER TABLE "User" ADD COLUMN     "skills" STRING;

-- CreateTable
CREATE TABLE "Experience" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userId" INT4 NOT NULL,
    "title" STRING NOT NULL,
    "company" STRING NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" STRING,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserExperiences_userId_idx" ON "Experience"("userId");
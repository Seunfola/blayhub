/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.
  - Added the required column `country` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workmode` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `salary` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location";
ALTER TABLE "Job" ADD COLUMN     "country" STRING NOT NULL;
ALTER TABLE "Job" ADD COLUMN     "workmode" STRING NOT NULL;
ALTER TABLE "Job" DROP COLUMN "salary";
ALTER TABLE "Job" ADD COLUMN     "salary" INT4 NOT NULL;

-- CreateIndex
CREATE INDEX "Job_category_idx" ON "Job"("category");

-- CreateIndex
CREATE INDEX "Job_title_description_idx" ON "Job"("title", "description");

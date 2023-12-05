/*
  Warnings:

  - The `api_id` column on the `Currency` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "api_id",
ADD COLUMN     "api_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Currency_api_id_key" ON "Currency"("api_id");

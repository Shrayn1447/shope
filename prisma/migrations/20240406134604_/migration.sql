/*
  Warnings:

  - You are about to drop the column `image_url` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image_url";

-- CreateTable
CREATE TABLE "Img" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Img_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Img" ADD CONSTRAINT "Img_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

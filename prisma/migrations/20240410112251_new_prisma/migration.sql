/*
  Warnings:

  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Img` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColorToProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descreption` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "category" AS ENUM ('SHIRT', 'SNEAKERS', 'TROUSERS', 'HOODIES', 'HEADDRESS');

-- DropForeignKey
ALTER TABLE "Img" DROP CONSTRAINT "Img_productId_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorToProduct" DROP CONSTRAINT "_ColorToProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToSize" DROP CONSTRAINT "_ProductToSize_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
DROP COLUMN "category",
DROP COLUMN "created_at",
DROP COLUMN "description",
DROP COLUMN "gender",
DROP COLUMN "material",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "updated_at",
ADD COLUMN     "descreption" TEXT NOT NULL,
ADD COLUMN     "product_categoryId" INTEGER,
ADD COLUMN     "product_image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Img";

-- DropTable
DROP TABLE "Size";

-- DropTable
DROP TABLE "_ColorToProduct";

-- DropTable
DROP TABLE "_ProductToSize";

-- DropEnum
DROP TYPE "ColorEnum";

-- DropEnum
DROP TYPE "ProductCategory";

-- DropEnum
DROP TYPE "ProductGender";

-- DropEnum
DROP TYPE "ProductMaterial";

-- DropEnum
DROP TYPE "ProductSize";

-- CreateTable
CREATE TABLE "Product_category" (
    "id" SERIAL NOT NULL,
    "category_name" "category" NOT NULL,

    CONSTRAINT "Product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_categoryId" INTEGER,

    CONSTRAINT "Variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variation_option" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "variationId" INTEGER,

    CONSTRAINT "Variation_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_configuration" (
    "product_id" INTEGER NOT NULL,
    "variation_id" INTEGER NOT NULL,

    CONSTRAINT "Product_configuration_pkey" PRIMARY KEY ("product_id","variation_id")
);

-- CreateTable
CREATE TABLE "product_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "product_img" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" INTEGER,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_categoryId_fkey" FOREIGN KEY ("product_categoryId") REFERENCES "Product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_product_categoryId_fkey" FOREIGN KEY ("product_categoryId") REFERENCES "Product_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variation_option" ADD CONSTRAINT "Variation_option_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_configuration" ADD CONSTRAINT "Product_configuration_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_configuration" ADD CONSTRAINT "Product_configuration_variation_id_fkey" FOREIGN KEY ("variation_id") REFERENCES "Variation_option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

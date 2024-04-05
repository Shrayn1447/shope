/*
  Warnings:

  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `color` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `gender` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `material` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('SHIRT', 'SNEAKERS', 'TROUSERS', 'HOODIES', 'HEADDRESS');

-- CreateEnum
CREATE TYPE "ProductColor" AS ENUM ('WHITE', 'BLACK');

-- CreateEnum
CREATE TYPE "ProductSize" AS ENUM ('S', 'M', 'L', 'X', 'XL');

-- CreateEnum
CREATE TYPE "ProductGender" AS ENUM ('MAN', 'GIRL');

-- CreateEnum
CREATE TYPE "ProductMaterial" AS ENUM ('COTTON', 'LINEN', 'WOOL', 'SILK');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategory" NOT NULL,
DROP COLUMN "color",
ADD COLUMN     "color" "ProductColor" NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "ProductGender" NOT NULL,
DROP COLUMN "material",
ADD COLUMN     "material" "ProductMaterial" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "ProductSize" NOT NULL;

-- DropEnum
DROP TYPE "TypeProduct";

/*
  Warnings:

  - The values [shirt,sneakers,trousers,hoodies,headdress] on the enum `TypeProduct` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeProduct_new" AS ENUM ('SHIRT', 'SNEAKERS', 'TROUSERS', 'HOODIES', 'HEADDRESS');
ALTER TABLE "Product" ALTER COLUMN "type" TYPE "TypeProduct_new" USING ("type"::text::"TypeProduct_new");
ALTER TYPE "TypeProduct" RENAME TO "TypeProduct_old";
ALTER TYPE "TypeProduct_new" RENAME TO "TypeProduct";
DROP TYPE "TypeProduct_old";
COMMIT;

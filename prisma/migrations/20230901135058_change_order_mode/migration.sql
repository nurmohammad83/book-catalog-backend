/*
  Warnings:

  - You are about to drop the `ordered_books` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderedBooks` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ordered_books" DROP CONSTRAINT "ordered_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ordered_books" DROP CONSTRAINT "ordered_books_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "orderedBooks" JSONB NOT NULL;

-- DropTable
DROP TABLE "ordered_books";

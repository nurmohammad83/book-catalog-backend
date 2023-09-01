/*
  Warnings:

  - You are about to drop the `OrderedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_orderId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderedBooks" JSONB[];

-- DropTable
DROP TABLE "OrderedBook";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

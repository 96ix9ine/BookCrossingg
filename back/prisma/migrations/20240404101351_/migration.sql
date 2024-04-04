/*
  Warnings:

  - You are about to drop the column `imagePath` on the `book` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `imagePath`;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `book_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

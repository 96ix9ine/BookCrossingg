/*
  Warnings:

  - You are about to drop the column `userId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_userId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `city` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `city`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ALTER COLUMN `vkId` DROP DEFAULT;
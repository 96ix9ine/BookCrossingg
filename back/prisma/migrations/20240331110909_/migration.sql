-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `descripton` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `dealType` VARCHAR(191) NOT NULL,
    `damageLevel` VARCHAR(191) NOT NULL,
    `imagePath` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

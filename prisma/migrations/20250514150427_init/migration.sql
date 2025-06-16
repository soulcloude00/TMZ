-- CreateTable
CREATE TABLE `StockItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `os` VARCHAR(191) NOT NULL,
    `features` JSON NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `reviews` INTEGER NOT NULL,
    `inStock` BOOLEAN NOT NULL DEFAULT true,
    `stockCount` INTEGER NOT NULL DEFAULT 0,
    `isNew` BOOLEAN NOT NULL DEFAULT false,
    `isHot` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

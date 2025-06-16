-- AlterTable
ALTER TABLE `stockitem` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'mobile',
    MODIFY `os` VARCHAR(191) NULL;

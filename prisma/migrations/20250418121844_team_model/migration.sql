/*
  Warnings:

  - Added the required column `shop` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `team` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `dob` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `shop` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NULL;

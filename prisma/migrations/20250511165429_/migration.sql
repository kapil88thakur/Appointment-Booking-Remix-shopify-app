/*
  Warnings:

  - You are about to drop the `_servicesonteams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicesonteams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_servicesonteams` DROP FOREIGN KEY `_ServicesOnTeams_A_fkey`;

-- DropForeignKey
ALTER TABLE `_servicesonteams` DROP FOREIGN KEY `_ServicesOnTeams_B_fkey`;

-- DropForeignKey
ALTER TABLE `servicesonteams` DROP FOREIGN KEY `ServicesOnTeams_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `servicesonteams` DROP FOREIGN KEY `ServicesOnTeams_teamId_fkey`;

-- DropTable
DROP TABLE `_servicesonteams`;

-- DropTable
DROP TABLE `servicesonteams`;

-- CreateTable
CREATE TABLE `_ServicesOnTeam` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ServicesOnTeam_AB_unique`(`A`, `B`),
    INDEX `_ServicesOnTeam_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ServicesOnTeam` ADD CONSTRAINT `_ServicesOnTeam_A_fkey` FOREIGN KEY (`A`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ServicesOnTeam` ADD CONSTRAINT `_ServicesOnTeam_B_fkey` FOREIGN KEY (`B`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

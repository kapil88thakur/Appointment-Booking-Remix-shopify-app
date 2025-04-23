-- AlterTable
ALTER TABLE `session` MODIFY `isOnline` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `userId` INTEGER NULL,
    MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `accountOwner` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `locale` VARCHAR(191) NULL,
    MODIFY `collaborator` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `emailVerified` BOOLEAN NOT NULL DEFAULT false;

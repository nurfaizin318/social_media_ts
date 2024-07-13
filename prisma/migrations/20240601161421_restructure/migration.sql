/*
  Warnings:

  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ready` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicle_id` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Made the column `otp` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `otp` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socket_id` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `token` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_driver_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_user_id_fkey`;

-- AlterTable
ALTER TABLE `driver` ADD COLUMN `ready` BOOLEAN NOT NULL,
    ADD COLUMN `vehicle_id` INTEGER NOT NULL,
    MODIFY `otp` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `otp` VARCHAR(191) NOT NULL,
    MODIFY `socket_id` VARCHAR(191) NOT NULL,
    MODIFY `token` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `transaction`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `vehicle` VARCHAR(191) NOT NULL,
    `distance` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `rideType_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `license` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RideType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `isPromo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `Driver`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_rideType_id_fkey` FOREIGN KEY (`rideType_id`) REFERENCES `RideType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_vehicle_id_fkey` FOREIGN KEY (`vehicle_id`) REFERENCES `Vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

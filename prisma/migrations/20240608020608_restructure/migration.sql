/*
  Warnings:

  - You are about to drop the column `vehicle` on the `order` table. All the data in the column will be lost.
  - Added the required column `rideType_id` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `driver` ADD COLUMN `rideType_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `vehicle`;

-- AlterTable
ALTER TABLE `user` MODIFY `latitude` VARCHAR(191) NULL,
    MODIFY `longitude` VARCHAR(191) NULL,
    MODIFY `otp` VARCHAR(191) NULL,
    MODIFY `socket_id` VARCHAR(191) NULL,
    MODIFY `token` VARCHAR(191) NULL;

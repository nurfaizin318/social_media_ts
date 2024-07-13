/*
  Warnings:

  - You are about to drop the column `otp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `otp`,
    DROP COLUMN `token`,
    ADD COLUMN `phone_number` VARCHAR(191) NULL;

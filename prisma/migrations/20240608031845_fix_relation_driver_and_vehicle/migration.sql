-- AddForeignKey
ALTER TABLE `Driver` ADD CONSTRAINT `Driver_rideType_id_fkey` FOREIGN KEY (`rideType_id`) REFERENCES `RideType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

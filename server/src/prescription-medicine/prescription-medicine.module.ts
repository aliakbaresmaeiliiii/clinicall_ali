import { Module } from '@nestjs/common';
import { PrescriptionMedicineController } from './prescription-medicine.controller';
import { PrescriptionMedicineService } from './prescription-medicine.service';

@Module({
  controllers: [PrescriptionMedicineController],
  providers: [PrescriptionMedicineService],
  exports: [PrescriptionMedicineService],
})
export class PrescriptionMedicineModule {}

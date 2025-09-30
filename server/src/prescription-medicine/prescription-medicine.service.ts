import { Injectable } from '@nestjs/common';

@Injectable()
export class PrescriptionMedicineService {
  async findAll() {
    return { message: 'Prescription medicine service placeholder' };
  }
}

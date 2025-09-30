import { Injectable } from '@nestjs/common';

@Injectable()
export class MedicationsService {
  async findAll() {
    return { message: 'Medications service placeholder' };
  }
}

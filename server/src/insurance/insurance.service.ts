import { Injectable } from '@nestjs/common';

@Injectable()
export class InsuranceService {
  async findAll() {
    return { message: 'Insurance service placeholder' };
  }
}

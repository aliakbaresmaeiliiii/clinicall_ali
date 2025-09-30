import { Injectable } from '@nestjs/common';

@Injectable()
export class DiseasesService {
  async findAll() {
    return { message: 'Diseases service placeholder' };
  }
}

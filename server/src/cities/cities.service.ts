import { Injectable } from '@nestjs/common';

@Injectable()
export class CitiesService {
  // TODO: Implement cities service methods
  async findAll() {
    return { message: 'Cities service placeholder' };
  }
}

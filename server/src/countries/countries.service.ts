import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesService {
  async findAll() {
    return { message: 'Countries service placeholder' };
  }
}

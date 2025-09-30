import { Injectable } from '@nestjs/common';

@Injectable()
export class NavItemsService {
  async findAll() {
    return { message: 'Nav items service placeholder' };
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenService {
  async findAll() {
    return { message: 'Refresh token service placeholder' };
  }
}

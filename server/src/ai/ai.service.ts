import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  // TODO: Implement AI service methods
  async processRequest(data: any) {
    return { message: 'AI service placeholder', data };
  }
}

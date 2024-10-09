import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}

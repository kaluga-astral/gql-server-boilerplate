import { Injectable } from '@nestjs/common';

import { Greeting } from './models/greeting.model';

@Injectable()
export class AppService {
  getHello(): Greeting {
    return { id: 'example', greeting: 'Hello, guys!!' };
  }
}

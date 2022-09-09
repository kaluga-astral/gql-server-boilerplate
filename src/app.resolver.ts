import { Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';
import { Greeting } from './models/greeting.model';

@Resolver((of) => Greeting)
export class AppResolver {
  constructor(private appService: AppService) {}

  @Query((returns) => Greeting)
  async greeting() {
    return this.appService.getHello();
  }
}

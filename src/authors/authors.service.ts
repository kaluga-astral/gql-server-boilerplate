import { Injectable } from '@nestjs/common';

import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  findOneById(id: number): Author {
    return { ...new Author(), id };
  }

  findAll(): Author[] {
    return [new Author(), new Author()];
  }
}

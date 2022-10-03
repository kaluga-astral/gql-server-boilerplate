import { Injectable } from '@nestjs/common';

import { FindPostsArgs } from './dto/find-posts.dto';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  findAll(args: FindPostsArgs): Post[] {
    return [new Post(), new Post()];
  }
}

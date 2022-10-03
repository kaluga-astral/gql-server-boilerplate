import { Args, Resolver } from '@nestjs/graphql';

import { Author } from '../authors/models/author.model';

import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  posts(@Args({ name: 'author', type: () => Author }) author: Author) {
    const { id } = author;

    return this.postsService.findAll({ authorId: id });
  }
}

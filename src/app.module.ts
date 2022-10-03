import { join } from 'path';

import * as Joi from 'joi';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';
import { AuthorsService } from './authors/authors.service';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('SENTRY_DSN'),
        environment: cfg.get('NODE_ENV'),
        logLevels: ['error'],
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), `env/.env.${process.env.NODE_ENV}`),
      cache: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        SENTRY_DSN: Joi.string().uri().default(''),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    AuthorsModule,
    PostsModule,
  ],

  providers: [
    AuthorsService,
    PostsService,
    {
      provide: APP_INTERCEPTOR,
      useFactory: () =>
        new SentryInterceptor({
          filters: [
            {
              type: HttpException,
              filter: (exception: HttpException) => 500 > exception.getStatus(),
            },
          ],
        }),
    },
  ],
})
export class AppModule {}

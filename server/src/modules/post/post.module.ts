import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/user.entity';
import { Collection } from '../collection/collection.entity';

import { ActionModule } from '../action/action.module';
import { Comment } from '../comment/comment.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag, User, Collection, Comment]),
    UserModule,
    AuthModule,
    ActionModule,
    NotificationModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

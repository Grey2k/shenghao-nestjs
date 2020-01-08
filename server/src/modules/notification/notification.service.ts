import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Repository } from 'typeorm';
import { NotificationDto } from './noticication.dto';

import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private readonly NotificationRepository: Repository<Notification>,
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        @InjectRepository(Comment)
        private readonly CommentRepository: Repository<Comment>
    ) { }


    //用户评论通知
    async commentMessage(id: number) {
        const comment = await this.CommentRepository.createQueryBuilder("comment")
            .where("comment.owner_uid=:id", { id })
            .leftJoin("comment.user", "user")
            .addSelect(["user.id", "user.name"])
            .leftJoin("comment.post", "post")
            .addSelect(["post.id", "post.title"])
            .getMany()
        console.log(comment)
        const follow = await this.UserRepository
            .findOne(id, { relations: ["user"] })
        return { comment, follow }

    }





}

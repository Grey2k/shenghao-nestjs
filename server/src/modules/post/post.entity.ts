import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  TableForeignKey,
  ViewColumn,
  VersionColumn,
  BeforeUpdate,
  Generated,

} from 'typeorm';
import { Category } from '../category/category.entity';

import { User } from '../user/user.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';
import { Collection } from '../collection/collection.entity';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  editor: boolean;

  // nullable可为空
  @Column('longtext', { nullable: true })
  body: string;



  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(
    type => User,
    user => user.posts,
  )
  user: User;

  //多个文章对应一个分类
  @ManyToOne(
    type => Category,
    category => category.posts,
  )
  category: Category;

  // 多个文章对应一个分类
  @ManyToMany(
    type => Tag,
    tag => tag.posts,
  )
  @JoinTable()
  tags: Tag[];

  //多个用户


  @OneToMany(
    type => Comment,
    comment => comment.post,
  )
  comments: Comment[];

  @ManyToOne(type => Collection, collection => collection.posts, {
    onDelete: 'CASCADE',
  })
  collection: Collection;


}

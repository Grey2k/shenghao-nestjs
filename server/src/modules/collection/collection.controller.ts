import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Get,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  Put,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { AuthGuard } from '@nestjs/passport';
import { CollectionDto } from './collection.dto';
import { User } from 'src/core/decorators/user.decorators';
import { User as UserEntity } from '../user/user.entity';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from '../file/file.dto';

@Controller('collections')
@ApiTags('集合')
export class CollectionController {
  constructor(private readonly CollectionService: CollectionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async storeCollection(@Body() data: CollectionDto, @User() user: UserEntity) {
    return await this.CollectionService.store(user, data);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async showCollection(@User() user: UserEntity, @Query('type') type: any) {
    return await this.CollectionService.showCollection(user.id, type);
  }

  @Get(':id/write')
  async fetchCollection(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: any,
  ) {
    return await this.CollectionService.showCollection(id, type);
  }

  //这里传入的是用户id
  @Get(':id/user')
  async getUserCollection(
    @Param('id', ParseIntPipe) id: number,
    @Query('type') type: any,
  ) {
    return await this.CollectionService.getUserCollection(id, type);
  }

  // 展示推荐专栏
  @Get(':id/recommend')
  async getRecommend(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getRecommend();
  }

  // 展示推荐笔记本
  @Get(':id/note')
  async getNote(
    @Query('type') type: any,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.CollectionService.getNote(type, limit);
  }

  //上传封面
  @Post(':id/cover')
  @UseInterceptors(FileInterceptor('cover'))
  async uploadCover(
    @UploadedFile() data: UploadFileDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.CollectionService.uploadCover(data, id);
  }

  //这里传入的是集合id
  @Get(':id')
  async getCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getCollection(id);
  }
  // 修改专栏名字
  @Put(':id')
  async changeCollection(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CollectionDto,
  ) {
    return await this.CollectionService.changeCollection(id, body);
  }

  @Get(':id/post')
  async getPostCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.getPostCollection(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeCollection(@Param('id', ParseIntPipe) id: number) {
    return await this.CollectionService.removeCollection(id);
  }
}

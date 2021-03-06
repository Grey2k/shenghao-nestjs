import { Controller, Post, Body } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('分类')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async store(@Body() data: CategoryDto) {
    return await this.categoryService.store(data);
  }
}

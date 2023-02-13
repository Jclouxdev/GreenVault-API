import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CreateFollowedCategoriesDto } from './dto/create-followed_categories.dto';
import { FollowedCategoriesEntity } from './followed_categories.entity';
import { FollowedCategoriesService } from './followed_categories.service';


@Controller('followed_categories')
export class FollowedCategoriesController {
    constructor(
      private categoriesService: FollowedCategoriesService,
    ) {}


  @Post('/create')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) categories: CreateFollowedCategoriesDto){
    return this.categoriesService.create(categories);
  }

  @Get('')
  getAllCategories() {
    return this.categoriesService.findAllFollowedCategories();
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateCategories: FollowedCategoriesEntity) {
    updateCategories.id = String(id)
    return this.categoriesService.update(updateCategories);
  }

  @Delete(':id/delete')
    async delete(@Param('id') id: string){
      return this.categoriesService.delete(id);
  } 
}
import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CategoriesEntity } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create-categories.dto';


@Controller('categories')
export class CategoriesController {
    constructor(
      private categoriesService: CategoriesService,
    ) {}


  @Post('/create')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) categories: CreateCategoriesDto){
    return this.categoriesService.create(categories);
  }

  @Get('')
  getAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateCategories: CategoriesEntity) {
    updateCategories.id = String(id)
    return this.categoriesService.update(updateCategories);
  }

  @Delete(':id/delete')
    async delete(@Param('id') id: string){
      return this.categoriesService.delete(id);
  } 
}
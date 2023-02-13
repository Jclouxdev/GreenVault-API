import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistEntity } from './wishlist.entity';
import { WishlistService } from './wishlist.service';


@Controller('user/wishlist')
export class WishlistController {
    constructor(
      private wishlistService: WishlistService,
    ) {}


  @Post('/create')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) categories: CreateWishlistDto){
    return this.wishlistService.create(categories);
  }

  @Get('')
  getAllCategories() {
    return this.wishlistService.findAllWishlist();
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateCategories: WishlistEntity) {
    updateCategories.id = String(id)
    return this.wishlistService.update(updateCategories);
  }

  @Delete(':id/delete')
    async delete(@Param('id') id: string){
      return this.wishlistService.delete(id);
  } 
}
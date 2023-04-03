import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistEntity } from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(WishlistEntity)
    private readonly wishlistRepo: Repository<WishlistEntity>,
  ) {}

  async create(wishlistDto: CreateWishlistDto): Promise<WishlistEntity> {
    const { user_id, announcement_id } = wishlistDto;
    try {
      const wishlist: WishlistEntity = await this.wishlistRepo.create({
        user_id,
        announcement_id,
      });
      await this.wishlistRepo.save(wishlist);
      return wishlist;
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllWishlist(): Promise<WishlistEntity[]> {
    //MODIFIER POUR TROUVER LA WISHLIST D'UN USER
    const wishlist = await this.wishlistRepo.find();
    console.table([wishlist[0]]);
    return this.wishlistRepo.find();
  }

  async update(wishlist: WishlistEntity): Promise<CreateWishlistDto> {
    try {
      await this.wishlistRepo.update(wishlist.id, wishlist);
      await this.wishlistRepo.save(wishlist);
      return wishlist;
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.wishlistRepo.delete(id);
  }
}

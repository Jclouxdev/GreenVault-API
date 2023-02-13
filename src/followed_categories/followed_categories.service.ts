import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CreateFollowedCategoriesDto } from './dto/create-followed_categories.dto';
import { FollowedCategoriesEntity } from './followed_categories.entity';

@Injectable()
export class FollowedCategoriesService {
  constructor(
    @InjectRepository(FollowedCategoriesEntity)    
    private readonly followed_categoriesRepo: Repository<FollowedCategoriesEntity>,
  ) {}

  async create(followed_categoriesDto: CreateFollowedCategoriesDto): Promise<FollowedCategoriesEntity> {
    const { user_id, categories_id } = followed_categoriesDto;
    try{
        const followed_categories: FollowedCategoriesEntity = await this.followed_categoriesRepo.create({ user_id, categories_id })
        await this.followed_categoriesRepo.save(followed_categories)
        return followed_categories
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); 
    }
  }

  async findAllFollowedCategories(): Promise<FollowedCategoriesEntity[]>{
    const followed_categories = await this.followed_categoriesRepo.find()
    console.table([followed_categories[0]])
    return this.followed_categoriesRepo.find()
  }


  async update(followed_categories: FollowedCategoriesEntity): Promise<CreateFollowedCategoriesDto> {
    try{
        await this.followed_categoriesRepo.update(followed_categories.id, followed_categories);
        await this.followed_categoriesRepo.save(followed_categories);
        return followed_categories;
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id :string): Promise<DeleteResult> {
    if (!isUUID(id)) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);    
      }
      return await this.followed_categoriesRepo.delete(id);
    }

}
import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
import { CreateCategoriesDto } from './dto/create-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)    
    private readonly categoriesRepo: Repository<CategoriesEntity>,
  ) {}

  async create(categoriesDto: CreateCategoriesDto): Promise<CategoriesEntity> {
    const { name, group_id } = categoriesDto;
    try{
        const categories: CategoriesEntity = await this.categoriesRepo.create({ name, group_id })
        await this.categoriesRepo.save(categories)
        return categories
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); 
    }
  }

  async findAllCategories(): Promise<CategoriesEntity[]>{
    const categories = await this.categoriesRepo.find()
    console.table([categories[0]])
    return this.categoriesRepo.find()
  }


  async update(categories: CategoriesEntity): Promise<CreateCategoriesDto> {
    try{
        await this.categoriesRepo.update(categories.id, categories);
        await this.categoriesRepo.save(categories);
        return categories;
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id :string): Promise<DeleteResult> {
    if (!isUUID(id)) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);    
      }
      return await this.categoriesRepo.delete(id);
    }

}
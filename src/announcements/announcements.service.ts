import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { AnnouncementsEntity } from './announcement.entity';
import { CreateAnnouncementsDto } from './dto/create-announcements.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementsEntity)    
    private readonly announcementsRepo: Repository<AnnouncementsEntity>,
  ) {}

  async create(announcementsDto: CreateAnnouncementsDto): Promise<AnnouncementsEntity> {
    const { user_id, title, price, description, categories } = announcementsDto;
    try{
        const announcements: AnnouncementsEntity = await this.announcementsRepo.create({ user_id, title, price, description, categories })
        await this.announcementsRepo.save(announcements)
        return announcements
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST); 
    }
  }

  async findAllAnnouncements(): Promise<AnnouncementsEntity[]>{
    const announcements = await this.announcementsRepo.find()
    console.table([announcements[0]])
    return this.announcementsRepo.find()
  }
  //RAJOUTER POUR TROUVER LES ANNONCES D'UN USER 


  async update(announcements: AnnouncementsEntity): Promise<CreateAnnouncementsDto> {
    try{
        await this.announcementsRepo.update(announcements.id, announcements);
        await this.announcementsRepo.save(announcements);
        return announcements;
    }
    catch(e){
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id :string): Promise<DeleteResult> {
    if (!isUUID(id)) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);    
      }
      return await this.announcementsRepo.delete(id);
    }

}
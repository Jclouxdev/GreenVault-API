import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { AnnouncementsEntity } from './announcement.entity';
import { CreateAnnouncementsDto } from './dto/create-announcements.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(AnnouncementsEntity)
    private readonly announcementsRepo: Repository<AnnouncementsEntity>,
  ) {}

  async create(
    announcementsDto: CreateAnnouncementsDto
  ): Promise<AnnouncementsEntity> {
    const { title, price, description, categorie, image } = announcementsDto;
    console.log(announcementsDto);
      const announcements: AnnouncementsEntity =
        await this.announcementsRepo.create({
          title,
          price,
          description,
          categorie,
          image,
        });
      console.log(announcements);
      await this.announcementsRepo.save(announcements);
      return announcements;
  }

  async findAllAnnouncements(): Promise<AnnouncementsEntity[]> {
    const announcements = await this.announcementsRepo.find();
    console.table([announcements[0]]);
    return this.announcementsRepo.find();
  }
  async findOne(id: string): Promise<AnnouncementsEntity> {
    if (!isUUID(id)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    const announcement = await this.announcementsRepo.findOne({ where: { id: id } });
    if (!announcement) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }
    return announcement;
  }

  async update(
    announcements: AnnouncementsEntity,
  ): Promise<CreateAnnouncementsDto> {
    try {
      await this.announcementsRepo.update(announcements.id, announcements);
      await this.announcementsRepo.save(announcements);
      return announcements;
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.announcementsRepo.delete(id);
  }
}

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
import { CreateGroupsDto } from './dto/create-groups.dto';
import { GroupsEntity } from './groups.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupsEntity)
    private readonly groupsRepo: Repository<GroupsEntity>,
  ) {}

  async create(groupsDto: CreateGroupsDto): Promise<GroupsEntity> {
    const name = groupsDto;
    try {
      const groups: GroupsEntity = await this.groupsRepo.create(name);
      await this.groupsRepo.save(groups);
      return groups;
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllGroups(): Promise<GroupsEntity[]> {
    const groups = await this.groupsRepo.find();
    console.table([groups[0]]);
    return this.groupsRepo.find();
  }

  async update(groups: GroupsEntity): Promise<CreateGroupsDto> {
    try {
      await this.groupsRepo.update(groups.id, groups);
      await this.groupsRepo.save(groups);
      return groups;
    } catch (e) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.groupsRepo.delete(id);
  }
}

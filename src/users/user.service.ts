import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  FindOneEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { email: email } });
  }

  FindOneUser(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username: username } });
  }

  FindOneId(id: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { id: id } });
  }

  async getUserId(id: string): Promise<UserEntity> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const foundId = await this.userRepo.findOne({ where: { id: id } });
    if (foundId === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundId;
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const { username, password, email } = userDto;
    const userInDb = await this.userRepo.findOne({
      where: { email },
    });
    if (userInDb) {
      throw new HttpException(
        'User already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const user: UserEntity = await this.userRepo.create({
      username,
      password,
      email,
    });
    await this.userRepo.save(user);
    return user;
  }

  async update(user: UserEntity): Promise<UpdateUserDto> {
    await this.userRepo.update(user.id, user);
    await this.userRepo.save(user);
    return user;
  }

  async delete(id: string): Promise<DeleteResult> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepo.delete(id);
  }

  async findAllUser(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();
    console.table([users[0]]);
    return this.userRepo.find();
  }
}

import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CommentEntity } from './comments.entity';
import { CommentsDto } from './dto/comments.dto';
import { CreateCommentsDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)    
    private readonly userRepo: Repository<CommentEntity>,
  ) {}

  async getCommentById(id: string): Promise<CommentEntity> {
  if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);    
    }
    const foundId = await this.userRepo.findOne({ where: { id: id, },
    });
    if (foundId === null ){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND); 
    } 
    return foundId;
  }

  async create(commentDto: CreateCommentsDto): Promise<CommentEntity> {
    const message = commentDto
    const comment: CommentEntity = await this.userRepo.create(message);
    await this.userRepo.save(comment);
    return comment; 
  }

}
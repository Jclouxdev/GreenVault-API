import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommentEntity } from 'src/comments/comments.entity';
import { WishlistEntity } from 'src/wishlist/wishlist.entity';
import { CategoriesEntity } from 'src/categories/categories.entity';
import { JoinTable } from 'typeorm';
import { AnnouncementsEntity } from '../announcements/announcement.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  Admin: boolean;

  @Column({ type: 'float', nullable: false, default: 100 })
  wallet: number;

  @CreateDateColumn({
    type: 'datetime',
    nullable: false,
  })
  creation_date: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  CGU: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        const salt = parseInt(process.env.SALT);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        throw new InternalServerErrorException('unable to hash password');
      }
    }
  }

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => WishlistEntity, (wishlist) => wishlist.user)
  wishlist: WishlistEntity[];

  @ManyToMany(() => CategoriesEntity, (categories) => categories.user)
  @JoinTable()
  categories: CategoriesEntity[];

  @OneToMany(() => AnnouncementsEntity, (announcement) => announcement.user_name)
  announcement: AnnouncementsEntity;
}

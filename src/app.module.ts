/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { GroupsEntity } from './groups/groups.entity';
import { CommentEntity } from './comments/comments.entity';
import { AnnouncementsEntity } from './announcements/announcement.entity';
import { CategoriesEntity } from './categories/categories.entity';
import { WishlistEntity } from './wishlist/wishlist.entity';
import { CategoriesModule } from './categories/categories.module';
import { GroupsModule } from './groups/groups.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        UserEntity,
        GroupsEntity,
        CommentEntity,
        AnnouncementsEntity,
        CategoriesEntity,
        WishlistEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    CategoriesModule,
    GroupsModule,
    AnnouncementsModule,
    WishlistModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

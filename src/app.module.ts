/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { FollowedCategoriesModule } from './followed_categories/followed_categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: +configService.get<number>('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
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
      inject: [ConfigService],
    }),
    UsersModule,
    CategoriesModule,
    GroupsModule,
    AnnouncementsModule,
    WishlistModule,
    FollowedCategoriesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

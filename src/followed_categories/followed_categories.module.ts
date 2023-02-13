import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FollowedCategoriesController } from './followed_categories.controller';
import { FollowedCategoriesEntity } from './followed_categories.entity';
import { FollowedCategoriesService } from './followed_categories.service';


@Module({
    imports: [TypeOrmModule.forFeature([FollowedCategoriesEntity]), forwardRef(()=>AuthModule)],
    controllers: [FollowedCategoriesController],
    providers: [FollowedCategoriesService],
    exports: [FollowedCategoriesService],
  })

export class FollowedCategoriesModule {}
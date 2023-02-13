import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriesController } from './categories.controller';
import { CategoriesEntity } from './categories.entity';
import { CategoriesService } from './categories.service';


@Module({
    imports: [TypeOrmModule.forFeature([CategoriesEntity]), forwardRef(()=>AuthModule)],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
  })

export class CategoriesModule {}
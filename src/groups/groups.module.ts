import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { GroupsController } from './groups.controller';
import { GroupsEntity } from './groups.entity';
import { GroupsService } from './groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupsEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}

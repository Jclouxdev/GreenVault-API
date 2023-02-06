import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { UsersService } from './user.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(()=>AuthModule)],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
  })

export class UsersModule {}
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { WishlistController } from './wishlist.controller';
import { WishlistEntity } from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([WishlistEntity]), forwardRef(()=>AuthModule)],
    controllers: [WishlistController],
    providers: [WishlistService],
    exports: [WishlistService],
  })

export class WishlistModule {}
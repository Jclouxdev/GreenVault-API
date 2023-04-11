import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { AnnouncementsEntity } from './announcement.entity';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementsDto } from './dto/create-announcements.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private announcementsService: AnnouncementsService) {}

  @Post('/create')
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    categories: CreateAnnouncementsDto,
    @Request() req
  ) {
    console.log("REQUEST: ", req.user)
    return this.announcementsService.create(categories);
  }

  @Get('')
  getAllCategories() {
    return this.announcementsService.findAllAnnouncements();
  }

  @Patch(':id/update')
  update(
    @Param('id') id: string,
    @Body() updateCategories: AnnouncementsEntity,
  ) {
    updateCategories.id = String(id);
    return this.announcementsService.update(updateCategories);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id: string) {
    return this.announcementsService.delete(id);
  }
}

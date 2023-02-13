import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { GroupsEntity } from './groups.entity';
import { GroupsService } from './groups.service';



@Controller('groups')
export class GroupsController {
    constructor(
      private groupsService: GroupsService,
    ) {}

    @Post('/create')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) groups: CreateGroupsDto){
    return this.groupsService.create(groups);
  }

  @Get('')
  getAllGroups() {
    return this.groupsService.findAllGroups();
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateGroups: GroupsEntity) {
    updateGroups.id = String(id)
    return this.groupsService.update(updateGroups);
  }

  @Delete(':id/delete')
    async delete(@Param('id') id: string){
      return this.groupsService.delete(id);
  } 
}
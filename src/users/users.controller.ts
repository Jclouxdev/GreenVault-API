import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(
      private userService: UsersService,
      private authService: AuthService
    ) {}
    
  @Get('')
  getAllUser() {
    return this.userService.findAllUser();
  }

  @Post('/auth/sign-up')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) user: CreateUserDto){
    return this.userService.create(user);
  }

  @UsePipes(ValidationPipe)
  @Post('/auth/login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() updateUser: UserEntity) {
    updateUser.id = String(id)
    return this.userService.update(updateUser);
  }

  @Delete(':id/delete')
    async delete(@Param('id') id: string){
      return this.userService.delete(id);
  } 

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserId(@Param('id')id: string){
    return this.userService.getUserId(id);
  }

}
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from './../auth/guards/local-auth.guard';
import { AuthService } from './../auth/services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService, // private jwtService: JwtService,
  ) {}

  // @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('')
  getAllUser() {
    return this.userService.findAllUser();
  }

  @Post('/auth/sign-up')
  create(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    user: CreateUserDto,
  ) {
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/auth/login')
  public async login(
    // @Body() loginUserDto: LoginUserDto
    @Request() req,
  ) {
    return this.authService.login(req.user.email, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    // console.log(this.jwtService.decode(req.header));
    console.log(req.header);
    // console.log(req.user);
    // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserId(@Param('id') id: string) {
    return this.userService.getUserId(id);
  }
}

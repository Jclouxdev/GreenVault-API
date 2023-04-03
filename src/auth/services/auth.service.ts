import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.FindOneEmail(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && !passwordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (!user) {
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async login(email: string, userId: string) {
    return {
      access_token: this.jwtService.sign({
        email,
        userId,
      }),
    };
  }
}

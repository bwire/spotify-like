import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResult, Enable2FAType } from './auth.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Request() { user }): Promise<AuthResult> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enable-2fa')
  enableTwoFA(@Request() { user }): Promise<Enable2FAType> {
    return this.authService.enable2FA(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('disable-2fa')
  disableTwoFA(@Request() { user }): Promise<UpdateResult> {
    return this.authService.disable2FA(user.id);
  }
}

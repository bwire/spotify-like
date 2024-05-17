import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResult } from './auth.types';
import { LocalAuthGuard } from './guards/local.guard';

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

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() { user }): Promise<AuthResult> {
    return this.authService.login(user);
  }
}

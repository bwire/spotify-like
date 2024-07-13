import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import {
  AuthResult,
  Enable2FAType,
  ValidateTokenDto,
  VerifyResult,
} from './auth.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateResult } from 'typeorm';
import { ApiKeyGuard } from './guards/bearer.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'Returns the user in the response',
  })
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

  @UseGuards(JwtAuthGuard)
  @Post('verify-2fa')
  verifyTwoFA(
    @Request() { user },
    @Body() dto: ValidateTokenDto,
  ): Promise<VerifyResult> {
    return this.authService.verify2FA(user.id, dto.token);
  }

  @UseGuards(ApiKeyGuard)
  @Get('profile')
  getProfile(@Request() { user }) {
    delete user.password;
    return {
      message: 'Authenticated with API key',
      user,
    };
  }

  @Get('test')
  getEnvVariables() {
    return this.authService.getEnvVariables();
  }
}

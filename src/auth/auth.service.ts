import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthResult, JwtPayload } from './auth.types';
import { AUTH_CONSTANTS } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.userService.findOne(dto.email);
    const passwordMatched = await bcrypt.compare(dto.password, user.password);
    if (passwordMatched) {
      const payload: JwtPayload = {
        email: user.email,
        sub: user.id,
      };
      return {
        accessToken: this.jwtService.sign(payload, {
          secret: AUTH_CONSTANTS.SECRET,
        }),
      };
    }
    throw new UnauthorizedException('Password does not match');
  }
}

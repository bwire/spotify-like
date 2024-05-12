import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async login(dto: LoginDto): Promise<User> {
    const user = await this.userService.findOne(dto.email);
    const passwordMatched = await bcrypt.compare(dto.password, user.password);
    if (passwordMatched) {
      delete user.password;
      return user;
    }
    throw new UnauthorizedException('Password does not match');
  }
}

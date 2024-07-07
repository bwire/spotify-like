import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(apiKey: string): Promise<User> {
    const user = await this.authService.validateUserByApiKey(apiKey);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

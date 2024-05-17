import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { RequestUserData } from '../auth.types';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userNameField: 'email' });
  }

  async validate(username: string, password: string): Promise<RequestUserData> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: user.id, email: user.email };
  }
}

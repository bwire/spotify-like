import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../auth.types';

@Injectable()
export class JwtArtistGuard extends AuthGuard('jwt') {
  handleRequest<TUser = JwtPayload>(err: any, user: any): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Artist authorization error');
    }
    if (user.artistId) {
      return user;
    }

    new UnauthorizedException('Cannot authorize artist');
  }
}

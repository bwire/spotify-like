import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AUTH_CONSTANTS } from './auth.constants';
import { JwtPayload, RequestUserData } from './auth.types';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      ignoreExpiration: false,
      secretOrKey: AUTH_CONSTANTS.SECRET,
    });
  }

  validate(payload: JwtPayload): RequestUserData {
    return { userId: payload.sub, email: payload.email };
  }
}

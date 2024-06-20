import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthResult, Enable2FAType, JwtPayload } from './auth.types';
import { AUTH_CONSTANTS } from './auth.constants';
import { User } from 'src/users/user.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private artistsService: ArtistsService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne(email);
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new UnauthorizedException("Password doesn't match");
    }
    delete user.password;
    return user;
  }

  async login(user: User): Promise<AuthResult> {
    const payload: JwtPayload = {
      email: user.email,
      userId: user.id,
    };

    const artist = await this.artistsService.findArtist(user.id);
    if (artist) {
      payload.artistId = artist.id;
    }

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: AUTH_CONSTANTS.SECRET,
      }),
    };
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);

    if (!user.is2FAEnabled) {
      const secret = speakeasy.generateSecret();
      console.log('New secret', secret);
      user.twoFASecret = secret.base32;
      await this.userService.updateSecretKey(user.id, user.twoFASecret);
    }

    return { secret: user.twoFASecret };
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }
}

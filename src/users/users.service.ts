import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository, UpdateOptions, UpdateResult } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);

    const user = await this.usersRepository.save({
      ...dto,
      apiKey: uuid4(),
    });
    delete user.password;
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ apiKey });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async updateSecretKey(
    userId: number,
    secret: string,
  ): Promise<UpdateOptions> {
    return this.usersRepository.update(
      { id: userId },
      { twoFASecret: secret, is2FAEnabled: true },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      { twoFASecret: null, is2FAEnabled: false },
    );
  }
}

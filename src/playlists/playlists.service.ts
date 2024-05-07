import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = dto.name;
    playlist.songs = await this.songsRepository.findBy({ id: In(dto.songs) });
    playlist.user = await this.usersRepository.findOneBy({ id: dto.user });

    return this.playlistsRepository.save(playlist);
  }
}

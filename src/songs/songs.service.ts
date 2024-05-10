import { Injectable } from '@nestjs/common';
import { In, QueryBuilder, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findById(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  async create(dto: CreateSongDto): Promise<Song> {
    const song = new Song();

    song.title = dto.title;
    song.duration = dto.duration;
    song.lyrics = dto.lyrics;
    song.releasedDate = dto.releaseDate;

    const artists = await this.artistsRepository.findBy({
      id: In(dto.artists),
    });
    song.artists = artists;

    return this.songsRepository.save(song);
  }

  updateOne(id: number, dto: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, dto);
  }

  deleteOne(id: number): Promise<void> {
    this.songsRepository.delete(id);
    return;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const builder = this.songsRepository.createQueryBuilder('s');
    builder.orderBy('s.releasedDate', 'DESC');

    return paginate(builder, options);
  }
}

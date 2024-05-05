import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private repository: Repository<Song>) {}

  findAll(): Promise<Song[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<Song> {
    return this.repository.findOneBy({ id });
  }

  create(dto: CreateSongDto): Promise<Song> {
    const song = new Song();

    song.title = dto.title;
    song.duration = dto.duration;
    song.artists = dto.artists;
    song.lyrics = dto.lyrics;
    song.releasedDate = dto.releaseDate;

    return this.repository.save(song);
  }

  updateOne(id: number, dto: UpdateSongDto): Promise<UpdateResult> {
    return this.repository.update(id, dto);
  }

  deleteOne(id: number): Promise<void> {
    this.repository.delete(id);
    return;
  }
}

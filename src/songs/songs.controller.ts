import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song-dto';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.songsService.findById(id);
  }

  @Post()
  create(@Body() newSongDto: CreateSongDto): Promise<Song> {
    try {
      return this.songsService.create(newSongDto);
    } catch (e) {
      throw new HttpException(
        'Server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.updateOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.songsService.deleteOne(id);
  }
}

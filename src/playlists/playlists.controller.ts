import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private service: PlaylistsService) {}

  @Post()
  create(@Body() dto: CreatePlaylistDto): Promise<Playlist> {
    return this.service.create(dto);
  }
}

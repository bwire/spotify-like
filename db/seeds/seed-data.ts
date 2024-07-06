import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { User } from 'src/users/user.entity';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';

export async function seedData(manager: EntityManager): Promise<void> {
  console.log('Seeding');

  await seedUser();
  await seedArtist();
  await seedPlaylist();

  async function seedUser(): Promise<User> {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash('12345', salt);

    const user = new User();
    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.password = encryptedPassword;
    user.apiKey = uuid4();
    user.phone = faker.phone.number();

    return manager.getRepository(User).save(user);
  }

  async function seedArtist(): Promise<Artist> {
    const user = await seedUser();

    const artist = new Artist();
    artist.user = user;

    console.log('New Artist', artist);
    return manager.getRepository(Artist).save(artist);
  }

  async function seedPlaylist(): Promise<Playlist> {
    const user = await seedUser();
    const playlist = new Playlist();
    playlist.user = user;
    playlist.name = faker.music.genre();

    return manager.getRepository(Playlist).save(playlist);
  }
}

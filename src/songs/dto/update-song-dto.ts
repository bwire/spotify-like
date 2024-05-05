import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly artists: string[];

  @IsOptional()
  @IsDateString()
  readonly releaseDate: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}

import { IsInt, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsParamDto {
  @ApiPropertyOptional({
    description: 'Get post with a specific id',
    example: '672d171d0904b0427a878c2f',
  })
  @IsOptional()
  @IsMongoId()
  id?: string;
}

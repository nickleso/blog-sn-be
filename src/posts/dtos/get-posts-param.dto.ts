import { IsInt, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsParamDto {
  @ApiPropertyOptional({
    description: 'Get post with a specific id',
    example: '603d2149e3bff2546cbed4c4',
  })
  @IsOptional()
  @IsMongoId()
  id?: string;
}

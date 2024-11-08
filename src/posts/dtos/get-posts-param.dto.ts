import { IsInt, IsMongoId, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsParamDto {
  @ApiPropertyOptional({
    description: 'Get post with a specific id',
    example: '672e6dd8134acc8c0c1464ae',
  })
  @IsOptional()
  @IsMongoId()
  id?: string;
}

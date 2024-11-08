import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'This is post title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  title: string;

  @ApiPropertyOptional({
    description: 'Post short description',
    example: 'This is post short description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(5000)
  shortDescription?: string;

  @ApiPropertyOptional({
    description: 'Post full description',
    example: 'This is post full description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(5000)
  fullDescription?: string;

  @ApiPropertyOptional({
    description: 'feature image Url',
    example: 'uploads/featureImage-1.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  // @IsUrl()
  featureImageUrl?: string;

  @ApiPropertyOptional({
    description: 'main image Url',
    example: 'uploads/mainImage-1.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  // @IsUrl()
  mainImageUrl?: string;
}

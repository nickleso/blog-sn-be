import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Blog title',
    example: 'This is blog title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  title: string;

  @ApiPropertyOptional({
    description: 'Blog short description',
    example: 'This is blog short description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1024)
  shortDescription?: string;

  @ApiPropertyOptional({
    description: 'Blog full description',
    example: 'This is blog full description',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1024)
  fullDescription?: string;

  @ApiPropertyOptional({
    description: 'feature image Url',
    example: 'http://localhost:3000/images/blog-image-1.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  featureImageUrl?: string;

  @ApiPropertyOptional({
    description: 'main image Url',
    example: 'http://localhost:3000/images/blog-image-1.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  mainImageUrl?: string;
}

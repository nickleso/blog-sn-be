import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { PostsService } from './providers/posts.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    const prefix = file.fieldname === 'featureImage' ? 'feature' : 'main';
    callback(null, `${prefix}-${uniqueSuffix}${extension}`);
  },
});

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Fetches a list of posts of the application.',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'The upper limit of pages you want the pagination to return',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    description:
      'The position of the page number that you want the API to return',
    required: false,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Projects fetched successfully based on the query',
  })
  @Get('/')
  public async getPosts(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.postsService.findAll(limit, page);
  }

  @ApiResponse({
    status: 200,
    description: 'Single post fetched successfully',
  })
  @Get('/:id')
  public async getPost(@Param() params: GetPostsParamDto) {
    return this.postsService.findOne(params.id.toString());
  }

  @ApiResponse({
    status: 201,
    description: 'Post added successfully',
  })
  @ApiOperation({
    summary: 'Added a new post to the application.',
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'featureImage', maxCount: 1 },
        { name: 'mainImage', maxCount: 1 },
      ],
      { storage },
    ),
  )
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    files: {
      featureImage?: Express.Multer.File[];
      mainImage?: Express.Multer.File[];
    },
  ) {
    try {
      console.log(files.featureImage);
      if (files.featureImage && files.featureImage[0]) {
        createPostDto.featureImageUrl = files.featureImage[0].path.replace(
          /\\/g,
          '/',
        );
      }
      if (files.mainImage && files.mainImage[0]) {
        createPostDto.mainImageUrl = files.mainImage[0].path.replace(
          /\\/g,
          '/',
        );
      }
      return this.postsService.create(createPostDto);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
  })
  @ApiOperation({
    summary: 'Updated existing post of the application.',
  })
  public async patchPost(
    @Param('id') id: string,
    @Body() patchPostDto: PatchPostDto,
    @UploadedFiles()
    files: {
      featureImage?: Express.Multer.File[];
      mainImage?: Express.Multer.File[];
    },
  ) {
    try {
      if (files.featureImage && files.featureImage[0]) {
        patchPostDto.featureImageUrl = files.featureImage[0].path.replace(
          /\\/g,
          '/',
        );
      }
      if (files.mainImage && files.mainImage[0]) {
        patchPostDto.mainImageUrl = files.mainImage[0].path.replace(/\\/g, '/');
      }

      return this.postsService.update(id, patchPostDto);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
  })
  @ApiOperation({
    summary: 'Deleted existing post of the application.',
  })
  @Delete('/:id')
  public async deletePost(@Param('id') id: string) {
    return this.postsService.delete(id);
  }
}

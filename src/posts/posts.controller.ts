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
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsParamDto } from './dtos/get-posts-param.dto';
import { PostsService } from './providers/posts.service';

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
    example: 20,
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
  public async createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Post updated successfully',
  })
  @ApiOperation({
    summary: 'Updated existing post of the application.',
  })
  @Patch('/:id')
  public async patchPost(
    @Param('id') id: string,
    @Body() patchPostDto: PatchPostDto,
  ) {
    return this.postsService.update(id, patchPostDto);
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

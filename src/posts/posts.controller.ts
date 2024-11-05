import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsParamDto } from './dtos/get-posts-param.dto';

@Controller('posts')
export class PostsController {
  @Get()
  public getPosts() {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getProjectParamDto: GetPostsParamDto,

    return { posts: 'posts list' };
    // return this.postsService.findAll(getProjectParamDto, limit, page);
  }

  @ApiResponse({
    status: 201,
    description: 'Project added successfully',
  })
  @ApiOperation({
    summary: 'Added a new project to the application.',
  })
  @Post()
  public createProject(@Body() createPostDto: CreatePostDto) {
    // return this.projectsService.create(createPostDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
  })
  @ApiOperation({
    summary: 'Updated existing project of the application.',
  })
  @Patch()
  public patchProject(@Body() patchPostDto: PatchPostDto) {
    // return patchPostDto;
  }

  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully',
  })
  @ApiOperation({
    summary: 'Deleted existing project of the application.',
  })
  @Delete('/:id')
  public deleteProject(@Param() getProjectParamDto: GetPostsParamDto) {
    // return this.projectsService.delete(getProjectParamDto.id);
  }
}

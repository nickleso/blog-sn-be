import { Controller, Get } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
  @Get()
  public getBlogs() {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getProjectParamDto: GetBlogsParamDto,

    return { blogs: 'blogs list' };
    // return this.blogsService.findAll(getProjectParamDto, limit, page);
  }
}

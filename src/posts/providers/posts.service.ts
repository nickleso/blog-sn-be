import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';

import * as fs from 'fs';
import * as path from 'path';
import { Post } from '../schemas/post.schemas';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  private deleteFile(filePath: string) {
    fs.unlink(path.resolve(filePath), (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
  }

  async findAll(limit: number, page: number) {
    try {
      const [posts, totalPosts] = await Promise.all([
        this.postModel
          .find()
          .limit(limit)
          .skip((page - 1) * limit)
          .exec(),
        this.postModel.countDocuments().exec(),
      ]);

      console.log(posts);

      return {
        status: HttpStatus.OK,
        message: 'Posts fetched successfully',
        data: {
          posts,
          totalPosts,
          limit,
          page,
          totalPages: Math.ceil(totalPosts / limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch posts',
        error: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Post with ID ${id} not found`,
        });
      }
      return {
        status: HttpStatus.OK,
        message: 'Post fetched successfully',
        data: post,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch post',
        error: error.message,
      });
    }
  }

  async create(createPostDto: CreatePostDto) {
    try {
      const newPost = await new this.postModel(createPostDto).save();
      return {
        status: HttpStatus.CREATED,
        message: 'Post created successfully',
        data: newPost,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to create post',
        error: error.message,
      });
    }
  }

  async update(id: string, patchPostDto: PatchPostDto) {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Post with ID ${id} not found`,
        });
      }

      if (patchPostDto.featureImageUrl && post.featureImageUrl) {
        this.deleteFile(post.featureImageUrl);
      }
      if (patchPostDto.mainImageUrl && post.mainImageUrl) {
        this.deleteFile(post.mainImageUrl);
      }

      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, patchPostDto, { new: true })
        .exec();
      return {
        status: HttpStatus.OK,
        message: `Post with ID ${id} updated successfully`,
        data: updatedPost,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to update post',
        error: error.message,
      });
    }
  }

  async delete(id: string) {
    try {
      const post = await this.postModel.findByIdAndDelete(id).exec();
      if (!post) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: `Post with ID ${id} not found`,
        });
      }

      if (post.featureImageUrl) {
        this.deleteFile(post.featureImageUrl);
      }
      if (post.mainImageUrl) {
        this.deleteFile(post.mainImageUrl);
      }

      return {
        status: HttpStatus.OK,
        message: `Post with ID ${id} deleted successfully`,
      };
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete post',
        error: error.message,
      });
    }
  }
}

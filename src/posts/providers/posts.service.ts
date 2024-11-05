import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Post } from '../schemas/post.schemas';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

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

      return {
        data: posts,
        meta: {
          totalPosts,
          limit,
          page,
          totalPages: Math.ceil(totalPosts / limit),
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch posts');
    }
  }
  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch the post');
    }
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const newPost = new this.postModel(createPostDto);
      return await newPost.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  async update(id: string, patchPostDto: PatchPostDto): Promise<Post> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, patchPostDto, { new: true })
        .exec();
      if (!updatedPost) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return updatedPost;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to update post');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.postModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete post');
    }
  }
}

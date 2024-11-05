import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 96 })
  title: string;

  @Prop({ minlength: 3, maxlength: 1024 })
  shortDescription?: string;

  @Prop({ minlength: 3, maxlength: 1024 })
  fullDescription?: string;

  @Prop()
  featureImageUrl?: string;

  @Prop()
  mainImageUrl?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
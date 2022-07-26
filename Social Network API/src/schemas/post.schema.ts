import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from './comment.schema';
import { User } from './user.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: any;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment.name,
      default: [],
    },
  ])
  comments: any[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

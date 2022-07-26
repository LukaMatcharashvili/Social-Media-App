import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CommentModule } from 'src/comment/comment.module';
import { Post, PostSchema } from 'src/schemas/post.schema';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    CommentModule,
    CloudinaryModule,
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

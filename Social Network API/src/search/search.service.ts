import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async searchUsers(searchQuery: string) {
    try {
      let searchRes = await this.UserModel.find({
        username: new RegExp(searchQuery, 'i'),
      });
      return searchRes;
    } catch (error) {
      throw error;
    }
  }

  async searchPosts(searchQuery: string) {
    try {
      let searchRes = await this.PostModel.find({
        content: new RegExp(searchQuery, 'i'),
      })
        .populate('author')
        .populate({
          path: 'comments',
          populate: 'author',
        });
      return searchRes;
    } catch (error) {
      throw error;
    }
  }
}

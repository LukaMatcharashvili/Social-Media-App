import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/comment.dto';
import { Post, PostDocument } from 'src/schemas/post.schema';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    private cloudinaryService: CloudinaryService,
    private commentService: CommentService,
    private userService: UserService,
  ) {}

  async createPost(userId: string, post: CreatePostDto) {
    try {
      const newPost = new this.PostModel(post);
      newPost.author = userId;
      if (newPost.image) {
        newPost.image = (
          await this.cloudinaryService.convertImageToCloudinary(newPost.image)
        ).url;
      }
      return newPost.save();
    } catch (error) {
      throw error;
    }
  }

  async updatePost(postId: string, post: UpdatePostDto, userId: string) {
    try {
      const foundPost = await this.PostModel.findOne({
        _id: postId,
        author: userId,
      });
      foundPost.content = post.content || foundPost.content;
      if (post.image && foundPost.image !== post.image) {
        foundPost.image = (
          await this.cloudinaryService.convertImageToCloudinary(post.image)
        ).url;
      }
      return await foundPost.save();
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId: string, userId: string) {
    try {
      const foundPost = await this.PostModel.findById(postId);
      if (!foundPost.likes.includes(userId)) {
        let updatedPost = await foundPost.updateOne({
          $push: { likes: userId },
        });
        return updatedPost;
      } else {
        throw Error('You are already liking this post!');
      }
    } catch (error) {
      throw error;
    }
  }

  async unlikePost(postId: string, userId: string) {
    try {
      const foundPost = await this.PostModel.findById(postId);
      if (foundPost.likes.includes(userId)) {
        let updatedPost = await foundPost.updateOne({
          $pull: { likes: userId },
        });
        const post = await this.PostModel.findById(postId)
          .populate('author')
          .populate({
            path: 'comments',
            populate: 'author',
          });
        return post;
      } else {
        throw Error('You are already disliking this post!');
      }
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string, userId: string) {
    try {
      const foundPost = await this.PostModel.findById(postId);
      const deletedComments = this.commentService.deleteCommentsByIds(
        foundPost.comments,
      );
      const deletedPost = await this.PostModel.findOneAndDelete({
        _id: postId,
        author: userId,
      });
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }

  async addComment(userId: string, postId: string, comment: CreateCommentDto) {
    try {
      const foundPost = await this.PostModel.findById(postId);
      const newComment = await this.commentService.postComment(userId, comment);
      let updatedPost = await foundPost.updateOne({
        $push: { comments: newComment.id },
      });
      return newComment;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: string, userId: string) {
    try {
      const deletedComment = await this.commentService.deleteComment(
        commentId,
        userId,
      );
      return deletedComment;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfilePosts(userId: string): Promise<any[]> {
    try {
      const posts = await this.PostModel.find({ author: userId })
        .populate('author')
        .populate({
          path: 'comments',
          populate: 'author',
        })
        .sort({ createdAt: -1 })
        .exec();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId: string) {
    try {
      let post = await this.PostModel.findById(postId)
        .populate('author')
        .populate({
          path: 'comments',
          populate: 'author',
        });
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getPostLikes(postId: string) {
    try {
      const post = await this.PostModel.findById(postId);
      const likes = await this.userService.getUsersByIdList(post.likes);
      return likes;
    } catch (error) {
      throw error;
    }
  }

  async getUsersFeed(userIds: string[]): Promise<any[]> {
    try {
      const posts = await this.PostModel.find()
        .where('author')
        .in(userIds)
        .populate('author')
        .populate({
          path: 'comments',
          populate: 'author',
        })
        .sort({ createdAt: -1 })
        .exec();
      return posts;
    } catch (error) {
      throw error;
    }
  }
}

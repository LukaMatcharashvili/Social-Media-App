import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async postComment(userId: string, comment: CreateCommentDto) {
    try {
      let newComment = new this.CommentModel(comment);
      newComment.author = userId;
      newComment = await newComment.save();
      return newComment;
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(commentId: string, userId: string) {
    try {
      const deletedComment = await this.CommentModel.findOneAndDelete({
        _id: commentId,
        author: userId,
      });
      return deletedComment;
    } catch (error) {
      throw error;
    }
  }

  async deleteCommentsByIds(commentIds: any[]) {
    try {
      const deletedComments = await this.CommentModel.deleteMany()
        .where('_id')
        .in(commentIds)
        .exec();
    } catch (error) {
      throw error;
    }
  }
}

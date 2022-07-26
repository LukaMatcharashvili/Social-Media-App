import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateCommentDto } from 'src/comment/dto/comment.dto';
import { UserService } from 'src/user/user.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(
    @Res() res: Response,
    @Request() req,
    @Body() post: CreatePostDto,
  ) {
    try {
      const newPost = await this.postService.createPost(req.user.id, post);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:postId')
  async updatePost(
    @Res() res: Response,
    @Request() req,
    @Body() post: UpdatePostDto,
    @Param('postId') postId: string,
  ) {
    try {
      const newPost = await this.postService.updatePost(
        postId,
        post,
        req.user.id,
      );
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('like/like/:postId')
  async likePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    try {
      const newPost = await this.postService.likePost(postId, req.user.id);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('like/unlike/:postId')
  async unlikePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    try {
      const newPost = await this.postService.unlikePost(postId, req.user.id);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('like/get/:postId')
  async getLikes(@Res() res: Response, @Param('postId') postId: string) {
    try {
      const likes = await this.postService.getPostLikes(postId);
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:postId')
  async getPost(@Res() res: Response, @Param('postId') postId: string) {
    try {
      const newPost = await this.postService.getPost(postId);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  async deletePost(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
  ) {
    try {
      const newPost = await this.postService.deletePost(postId, req.user.id);
      res.status(200).json(newPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('comment/:postId')
  async addComment(
    @Res() res: Response,
    @Request() req,
    @Param('postId') postId: string,
    @Body() comment: CreateCommentDto,
  ) {
    try {
      const newComment = await this.postService.addComment(
        req.user.id,
        postId,
        comment,
      );
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('comment/:commentId')
  async deleteComment(
    @Res() res: Response,
    @Request() req,
    @Param('commentId') commentId: string,
  ) {
    try {
      const deletedComment = await this.postService.deleteComment(
        commentId,
        req.user.id,
      );
      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:userId')
  async getUserPosts(@Res() res: Response, @Param('userId') userId: string) {
    try {
      const posts = await this.postService.getUserProfilePosts(userId);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('feed/get')
  async getUserFeed(@Res() res: Response, @Request() req) {
    try {
      const user = await this.userService.findById(req.user.id);
      user.followings.push(user.id);
      const posts = await this.postService.getUsersFeed(user.followings);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

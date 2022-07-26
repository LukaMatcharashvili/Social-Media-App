import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('follow/:followId')
  async followUser(
    @Param('followId') userToFollowId: string,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const result = await this.userService.followUser(
        req.user.id,
        userToFollowId,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('unfollow/:unfollowId')
  async unfollowUser(
    @Param('unfollowId') userToUnfollowId: string,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const result = await this.userService.unfollowUser(
        req.user.id,
        userToUnfollowId,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('followers/:userId')
  async getFollowers(
    @Res() res: Response,
    @Request() req,
    @Param('userId') userId: string,
  ) {
    try {
      const followers = await this.userService.getFollowers(userId);
      res.status(200).json(followers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('followings/:userId')
  async getfollowings(
    @Res() res: Response,
    @Request() req,
    @Param('userId') userId: string,
  ) {
    try {
      const followings = await this.userService.getFollowings(userId);
      res.status(200).json(followings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:userId')
  async getUser(
    @Res() res: Response,
    @Request() req,
    @Param('userId') userId: string,
  ) {
    try {
      const foundUser = await this.userService.findById(userId);
      res.status(200).json(foundUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

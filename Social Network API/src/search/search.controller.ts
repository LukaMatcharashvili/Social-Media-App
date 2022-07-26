import {
  Controller,
  Get,
  Res,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';
import { query, Response } from 'express';

@Controller('api/search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async searchUsers(
    @Res() res: Response,
    @Query() query: { searchQuery: string },
  ) {
    try {
      const users = await this.searchService.searchUsers(query.searchQuery);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('post')
  async searchPosts(
    @Res() res: Response,
    @Query() query: { searchQuery: string },
  ) {
    try {
      const posts = await this.searchService.searchPosts(query.searchQuery);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

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
import * as path from 'path';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  regsiterUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.addUser(user);
  }

  @Get('verify/:userId/:verificationToken')
  async verifyUser(
    @Param('userId') userId: string,
    @Param('verificationToken') verificationToken: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.verifyEmail(
      userId,
      verificationToken,
    );
    if (result.verified) {
      res.sendFile(
        path.join(
          __dirname,
          '../view/emailVerification/emailVerifySuccess.html',
        ),
      );
    } else {
      res.sendFile(
        path.join(__dirname, '../view/emailVerification/emailVerifyFail.html'),
      );
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    try {
      const response = await this.authService.login(req.user);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  async deleteUser(@Request() req, @Res() res: Response) {
    try {
      const deletedUser = await this.userService.deleteUser(req.user.id);
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
  async updateUser(
    @Request() req,
    @Res() res: Response,
    @Body() user: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(req.user.id, user);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Post('resetpassword')
  async resetPasswordS(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.authService.receiveEmailForPasswordReset(
        body.email,
      );
      return res.status(200).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  @Post('/resetpassword/:userId/:resetToken')
  async resetPasswordE(
    @Body() body: any,
    @Res() res: Response,
    @Param('userId') userId: string,
    @Param('resetToken') resetToken: string,
  ) {
    try {
      const result = await this.authService.resetPassword(
        userId,
        resetToken,
        body.password,
      );
      return res.status(200).json({ message: result.message });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

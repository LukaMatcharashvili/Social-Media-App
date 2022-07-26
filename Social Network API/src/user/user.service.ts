import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { randomBytes } from 'crypto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { EmailService } from 'src/email/email.service';
import {
  PasswordReset,
  PasswordResetDocument,
} from 'src/schemas/passwordReset.schema';
import { Post, PostDocument } from 'src/schemas/post.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(PasswordReset.name)
    private PasswordResetModel: Model<PasswordResetDocument>,
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    private cloudinaryService: CloudinaryService,
    private emailService: EmailService,
  ) {}

  async addUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.UserModel(user);
      newUser.verificationToken = randomBytes(20).toString('hex');

      if (newUser.coverPic) {
        newUser.coverPic = (
          await this.cloudinaryService.convertImageToCloudinary(
            newUser.coverPic,
          )
        ).url;
      }
      if (newUser.profilePic) {
        newUser.profilePic = (
          await this.cloudinaryService.convertImageToCloudinary(
            newUser.profilePic,
          )
        ).url;
      }

      const savedUser = await newUser.save();

      this.emailService.sendVerificationEmail(
        savedUser.email,
        savedUser.id,
        savedUser.verificationToken,
      );

      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const user = await this.UserModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await this.UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async changeVerifyToTrue(userId: String) {
    try {
      const user = await this.UserModel.findById(userId);
      user.verified = true;
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, user: UpdateUserDto): Promise<User> {
    try {
      const foundUser = await this.UserModel.findById(userId);
      foundUser.username = user.username || foundUser.username;
      foundUser.password = user.password || foundUser.password;
      if (foundUser.email !== user.email) {
        foundUser.email = user.email;
        foundUser.verified = false;
        this.emailService.sendVerificationEmail(
          user.email,
          userId,
          foundUser.verificationToken,
        );
      }

      if (user.coverPic && user.coverPic !== foundUser.coverPic) {
        foundUser.coverPic = (
          await this.cloudinaryService.convertImageToCloudinary(user.coverPic)
        ).url;
      }
      if (user.profilePic && user.profilePic !== foundUser.profilePic) {
        foundUser.profilePic = (
          await this.cloudinaryService.convertImageToCloudinary(user.profilePic)
        ).url;
      }
      return foundUser.save();
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<User> {
    try {
      const deletedUser = await this.UserModel.findByIdAndDelete(userId);
      const deletedPosts = this.PostModel.deleteMany({
        author: userId,
      }).exec();
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async createPasswordResetToken(userId: string) {
    try {
      const passwordReset = new this.PasswordResetModel();
      passwordReset.userId = userId;
      const savedToken = await passwordReset.save();
      return savedToken;
    } catch (error) {
      throw error;
    }
  }

  async verifyPasswordResetToken(userId, token) {
    const foundToken = await this.PasswordResetModel.findOne({ token, userId });
    return foundToken;
  }

  async deletePasswordResetToken(token) {
    const deletedToken = await this.PasswordResetModel.findOneAndDelete({
      token,
    });
    return deletedToken;
  }

  async changePassword(userId, password) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = password;
    return user.save();
  }

  async followUser(userId: string, userToFollowId: string) {
    try {
      const user = await this.UserModel.findById(userId);
      const userToFollow = await this.UserModel.findById(userToFollowId);
      if (!userToFollow.followers.includes(userId)) {
        await userToFollow.updateOne({ $push: { followers: userId } });
        await user.updateOne({ $push: { followings: userToFollowId } });
        return { message: 'user has been followed' };
      } else {
        throw Error('you allready follow this user');
      }
    } catch (error) {
      throw error;
    }
  }

  async unfollowUser(userId: string, userToUnfollowId: string) {
    try {
      const user = await this.UserModel.findById(userId);
      const userToUnfollow = await this.UserModel.findById(userToUnfollowId);
      if (userToUnfollow.followers.includes(userId)) {
        await userToUnfollow.updateOne({
          $pull: { followers: userId },
        });
        await user.updateOne({ $pull: { followings: userToUnfollowId } });
        return { message: 'user has been unfollowed' };
      } else {
        throw Error('you dont follow this user');
      }
    } catch (error) {
      throw error;
    }
  }

  async getFollowers(userId: string) {
    try {
      const user = await this.findById(userId);
      const followers = await this.UserModel.find()
        .where('_id')
        .in(user.followers);
      return followers;
    } catch (error) {
      throw error;
    }
  }

  async getFollowings(userId: string) {
    try {
      const user = await this.findById(userId);
      const followings = await this.UserModel.find()
        .where('_id')
        .in(user.followings);
      return followings;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByIdList(userIds: string[]) {
    try {
      const users = await this.UserModel.find().where('_id').in(userIds).exec();
      return users;
    } catch (error) {
      throw error;
    }
  }
}

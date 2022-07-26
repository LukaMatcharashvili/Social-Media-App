import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailModule } from 'src/email/email.module';
import {
  PasswordReset,
  PasswordResetSchema,
} from 'src/schemas/passwordReset.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Post, PostSchema } from 'src/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: PasswordReset.name, schema: PasswordResetSchema },
    ]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CloudinaryModule,
    EmailModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

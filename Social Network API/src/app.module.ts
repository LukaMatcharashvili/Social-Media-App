import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailModule } from './email/email.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    AuthModule,
    CloudinaryModule,
    EmailModule,
    PostModule,
    CommentModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

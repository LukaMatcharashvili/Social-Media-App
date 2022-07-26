import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @Prop({ type: String, unique: true })
  verificationToken: string;

  @Prop()
  profilePic: string;

  @Prop()
  coverPic: string;

  @Prop({ type: [String], default: [] })
  followers: string[];

  @Prop({ type: [String], default: [] })
  followings: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

async function generateHash(password: string) {
  return bcrypt.hash(password, 12);
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isNew || user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});
